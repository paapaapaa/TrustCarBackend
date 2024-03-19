// ./prisma/seed.ts
import {PrismaClient, engine_type, report_type, } from "@prisma/client";
import questions from  "../data/questions.json";
import sections from "../data/sections.json";
import mapping from "../data/mapping.json";
import languages from "../data/languages.json";

const prisma = new PrismaClient();

async function deleteStaticTables() {
  await prisma.question_mapping.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.question.deleteMany({});
}

async function createLanguages() {
  for (const l of languages) {
    const languageExists = await prisma.language.findUnique({
      where: {
        id: l.id,
      },
    });

    if (!languageExists) {
      await prisma.language.create({
        data: {
          id: l.id,
          name: l.name,
          code: l.code,
        },
      });
    }
  }
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
        section_id:m["section_id"] as number,
        question_id:m["question_id"] as number,
        engine_type:m["engine_type"] as engine_type
      }
    });
  }
}

async function main() {

  await deleteStaticTables();
  await createLanguages();
  await createQuestions();
  await createSections();
  await createQuestionMappings();
}

main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
