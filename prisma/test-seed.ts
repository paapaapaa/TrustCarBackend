// ./prisma/seed.ts
import {
    PrismaClient,
    engine_type,
    report_type,
  } from "@prisma/client";
  import questions from "../data/test-data/questions.json";
  import sections from "../data/test-data/sections.json";
  import mapping from "../data/test-data/mapping.json";
  import languages from "../data/test-data/languages.json";
  import { genSalt, hash } from "bcrypt";
  
  const prisma = new PrismaClient();
  
  async function deleteAllTables() {
    //dont change the order of deletion
    await prisma.question_mapping.deleteMany({});
    await prisma.section.deleteMany({});
    await prisma.attachments.deleteMany({});
    await prisma.report_row.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.question.deleteMany({});
    await prisma.translation.deleteMany({});
    await prisma.language.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.organization.deleteMany({});
  }
  
  async function createLanguages() {
    await prisma.language.createMany({
      data: languages,
    });
  }
  
  async function createQuestions() {
    for (const q of questions) {
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
  }
  
  async function createSections() {
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
  }
  
  async function createQuestionMappings() {
    for (const m of mapping) {
      await prisma.question_mapping.create({
        data:{
          report_type:m["report_type"] as report_type,
          section_id:m["section_id"] ,
          question_id:m["question_id"] ,
          engine_type:m["engine_type"] as engine_type
        }
      });
    }
  }
  
  async function addTestUser() {
  
    const org = await prisma.organization.create({
      data:{
        name: "organization 1",
        type: "inspection",
      }
    });
    
      const username = "testuser";
      const password = "testpassword";
      const firstname = "testfirstname";
      const lastname = "testlastname";
      const organizationId = org.id;
    
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
    
  }
  
  async function main() {
    await deleteAllTables();
    await createLanguages();
    await createQuestions();
    await createSections();
    await createQuestionMappings();
    await addTestUser();
  }
  
  main()
    .catch((e) => console.error(e))
    .finally(() => {
      void (async () => {
        await prisma.$disconnect();
      })();
    });
  