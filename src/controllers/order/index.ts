import { NextFunction, Request, Response } from "express";
import {
  createOrderValidator,
  getOrderPriceValidator,
  updateOrderValidator,
} from "../../utility/validators/order";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (_req.params.organizationType !== "seller") {
    res.status(403).json({ message: "You are not allowed to create orders" });
  }

  const {
    brand_and_model,
    engine_type,
    registration_number,
    report_type,
    car_production_number,
    additional_information2,
    additional_information,
    inspection_organization_id,
    sections,
  } = createOrderValidator.cast(_req.body);

  try {
    if (report_type !== "light") {
      const sections = await prisma.section.findMany({
        where: {
          question_map: {
            some: {
              report_type: report_type,
              engine_type: engine_type,
            },
          },
        },
      });
      const order_total = sections.reduce(
        (acc, curr) => acc + curr.unit_price,
        0
      );
      const order = await prisma.order.create({
        data: {
          brand_and_model,
          engine_type,
          registration_number,
          car_production_number,
          order_total_amount: order_total,
          additional_information2,
          additional_information,
          report_type,
          order_rows: {
            createMany: {
              data: sections.map((section) => ({
                section_id: section.id,
              })),
            },
          },
          customer_id: parseInt(_req.params.userId),
          customer_organization_id: parseInt(_req.params.organizationId),
          inspection_organization_id,
          order_status:"not_started"
        },
      });
      res.status(201).json({ order });
    }
     else if(report_type === "light" && sections) {
      const report_sections = await prisma.section.findMany({
        where: {
          id: {
            in: sections,
          },
        },
      });
      const order_total = report_sections.reduce(
        (acc, curr) => acc + curr.unit_price,
        0
      );
      const order = await prisma.order.create({
        data: {
          brand_and_model,
          engine_type,
          registration_number,
          car_production_number,
          order_total_amount: order_total,
          additional_information2,
          additional_information,
          report_type,
          order_rows: {
            createMany: {
              data: report_sections.map((section) => ({
                section_id: section.id,
              })),
            },
          },
          customer_id: parseInt(_req.params.userId),
          customer_organization_id: parseInt(_req.params.organizationId),
          inspection_organization_id,
          order_status:"not_started"
        },
      });
      res.status(201).json({ order });
     }
     else {
      res.status(400).json({ message: "Something wrong with request" });
    }
  } catch (error) {
    next(error);
  }
};

export const getOrders = async(_req: Request, res: Response) => {
  let query = {};
  if(_req.params.organizationType === "inspection") {
    query = {
      where: {
        inspection_organization_id: parseInt(_req.params.organizationId),
      },
    };
  }
  else if(_req.params.organizationType === "seller") {
    query = {
      where: {
        customer_organization_id: parseInt(_req.params.organizationId),
      },
    };
  }
  else {
    res.status(403).json({ message: "You are not allowed to fetch orders" });
  }
  try {
    const orders = await prisma.order.findMany(query);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: "Error fetching orders" });
  }
};


export const getSections = async (_req: Request, res: Response) => {
  try {
    const sections = await prisma.section.findMany({
      include:{
        translations:{
          select:{
            value:true,
          }
        }
      }
    });
    res.status(200).json({ sections });
  } catch (error) {
    res.status(400).json({ message: "Error fetching sections" });
  }
};

export const getOrderPrice = async (_req: Request, res: Response) => {
  const { report_type, engine_type, sections } = getOrderPriceValidator.cast(
    _req.query
  );
  try {
    if (report_type !== "light") {
      const sections = await prisma.section.findMany({
        where: {
          question_map: {
            some: {
              report_type: report_type,
              engine_type: engine_type,
            },
          },
        },
      });
      const order_total = sections.reduce(
        (acc, curr) => acc + curr.unit_price,
        0
      );
      res.status(200).json({ order_total });
    } else if (report_type === "light" && sections) {
      const report_sections = await prisma.section.findMany({
        where: {
          id: {
            in: sections,
          },
        },
      });
      const order_total = report_sections.reduce(
        (acc, curr) => acc + curr.unit_price,
        0
      );
      res.status(200).json({ order_total });
    }
    else {
      res.status(400).json({ message: "Something wrong with the request" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching order price" });
  }
};

export const updateOrderStatus = async (_req: Request, res: Response, next: NextFunction) => {
  if(_req.params.organizationType !== "inspection") {
    res.status(403).json({ message: "You are not allowed to update order status" });
  }
  const { status,id, delivery_date } = updateOrderValidator.cast(_req.body);
  if(status === "ready"){
    res.status(403).json({ message: "You are not allowed to update order status to ready" });
  }
  const { userId } = _req.params;
  const modified_by_user = parseInt(userId);
  try {
    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        order_status: status,
        inspector_id: modified_by_user,
        ...(delivery_date && { delivery_date }),
      },
    });
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
