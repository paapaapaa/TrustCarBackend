// ./prisma/seed.ts
import { PrismaClient, report_type, report_variant } from "@prisma/client";
import { hash, genSalt } from "bcrypt";
import quetions from  "../data/quetions.json";
import sections from "../data/sections.json";
import mapping from "../data/mapping.json";

const prisma = new PrismaClient();



async function main() {
  // Create translations

await prisma.organization.create({
  data:{
    name: "organization 1",
    type: "inspection",
  }
});

  const username = "testuser";
  const password = "testpassword";
  const firstname = "testfirstname";
  const lastname = "testlastname";
  const organizationId = 1;

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  await prisma.user.create({
    data: {
      username,
      password_salt: salt,
      hashpassword: hashedPassword,
      firstname,
      lastname,
      organization:{
        connect:{
          id: organizationId
        }
      }
    },
  });

  for (const q of quetions) {
    await prisma.question.create({
      data:{
        id: q.id,
        traslations:{
          create:{
            english_text:q.english_text,
            finnish_text:q.finnish_text
          }
        }
      },
    });
  }

  for (const s of sections) {
    await prisma.section.create({
      data:{
        id:s.id,
        traslations:{
          create:{
            english_text:s.english_text,
            finnish_text:s.finnish_text
          }
        }
      },
    });
  }

  for (const m of mapping) {
   await prisma.question_mapping.create({
    data:{
      report_type:m["ReportType"] as report_type,
      section_id:m["SectionId"],
      question_id:m["QuetionId"],
      report_variant:m["ReportVariant"] as report_variant
    }
   });
  }
}

main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
