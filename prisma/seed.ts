// ./prisma/seed.ts
import { PrismaClient, engine_type, report_type,  } from "@prisma/client";
import { hash, genSalt } from "bcrypt";
import quetions from  "../data/questions.json";
import sections from "../data/sections.json";
import mapping from "../data/mapping.json";
import languages from "../data/languages.json";

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

  for (const l of languages) {
    await prisma.language.create({
      data:{
        id: l.id,
        name: l.name,
        code: l.code
      }
    })
  }

  for (const q of quetions) {
    await prisma.question.create({
      data:{
        id: q.id,
        translations: {
          create: q.translations.map(t => ({
            value: t.value,
            language_id: t.language_id,
          })),
        },
      },
    });
  }

  for (const s of sections) {
    await prisma.section.create({
      data:{
        id:s.id,
        translations: {
          create: s.translations.map(t => ({
            value: t.value,
            language_id: t.language_id,
          })),
        },
      },
    });
  }

  for (const m of mapping) {
   await prisma.question_mapping.create({
    data:{
      report_type:m["report_type"] as report_type,
      section_id:m["section_id"] as number,
      question_id:m["question_id"] as number,
      engine_type:m["engine_type"] as engine_type
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
