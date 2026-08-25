import { PrismaClient } from '@prisma/client';
import { MOCK_RESEARCH_PROBLEMS, MOCK_PAPERS, MOCK_COMPARISONS } from './mockOrkgData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ORKG database with real research papers & structured statements...');

  // 1. Seed Research Problems
  for (const prob of MOCK_RESEARCH_PROBLEMS) {
    await prisma.researchProblem.upsert({
      where: { id: prob.id },
      update: { name: prob.name, field: prob.field, description: prob.description },
      create: {
        id: prob.id,
        name: prob.name,
        field: prob.field,
        description: prob.description,
      },
    });
  }

  // 2. Seed Papers & Authors & Statements
  for (const p of MOCK_PAPERS) {
    const paper = await prisma.paper.upsert({
      where: { id: p.id },
      update: {
        title: p.title,
        abstract: p.abstract,
        doi: p.doi,
        year: p.year,
        venue: p.venue,
        pdfUrl: p.pdfUrl,
        openAccess: p.openAccess,
        researchProblemId: p.researchProblemId,
      },
      create: {
        id: p.id,
        title: p.title,
        abstract: p.abstract,
        doi: p.doi,
        year: p.year,
        venue: p.venue,
        pdfUrl: p.pdfUrl,
        openAccess: p.openAccess,
        researchProblemId: p.researchProblemId,
        authors: {
          connectOrCreate: p.authors.map(a => ({
            where: { id: a.id },
            create: { id: a.id, name: a.name, department: a.department }
          }))
        }
      },
    });

    // Statements
    for (const st of p.statements) {
      await prisma.statement.upsert({
        where: { id: st.id },
        update: { subject: st.subject, predicate: st.predicate, object: st.object },
        create: {
          id: st.id,
          paperId: paper.id,
          subject: st.subject,
          predicate: st.predicate,
          object: st.object,
        }
      });
    }
  }

  // 3. Seed Comparisons
  for (const comp of MOCK_COMPARISONS) {
    await prisma.comparison.upsert({
      where: { id: comp.id },
      update: {
        title: comp.title,
        description: comp.description,
        researchProblemId: comp.researchProblemId,
        properties: comp.properties,
        matrixData: comp.papers as any,
      },
      create: {
        id: comp.id,
        title: comp.title,
        description: comp.description,
        researchProblemId: comp.researchProblemId,
        paperIds: comp.papers.map(p => p.id),
        properties: comp.properties,
        matrixData: comp.papers as any,
      }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
