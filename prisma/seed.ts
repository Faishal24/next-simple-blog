import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
  {
    name: 'Faishal',
    slug: 'faishal',
    email: 'faishal@example.com',
    avatar: "https://avatar.iran.liara.run/public/" + Math.floor(Math.random() * 10),
    posts: {
      create: [
        {
          title: 'My First Blog Post',
          slug: 'my-first-blog-post',
          description: 'This is the description for the first blog post.',
          thumbnail: "https://fakeimg.pl/600x400",
          content: 'This is the full content of the blog post.',
          status: 'published',
          publishedAt: new Date(),
        },
        {
          title: 'Upcoming Blog Launch',
          slug: 'upcoming-blog-launch',
          description: 'This post is scheduled for later.',
          thumbnail: "https://fakeimg.pl/600x400",
          content: 'Some sneak peek content.',
          status: 'scheduled',
          publishedAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 hari ke depan
        },
        {
          title: 'Draft: Blog Plan',
          slug: 'draft-blog-plan',
          description: 'Draft of my blogging strategy.',
          thumbnail: "https://fakeimg.pl/600x400",
          content: 'Initial thoughts and plans.',
          status: 'draft',
        },
      ],
    },
  },
  {
    name: 'Sarah',
    slug: 'sarah',
    email: 'sarah@example.com',
    avatar: "https://avatar.iran.liara.run/public/" + Math.floor(Math.random() * 10),
    posts: {
      create: [
        {
          title: 'Tips for React Developers',
          slug: 'tips-for-react-developers',
          description: 'Some cool React tips.',
          thumbnail: "https://fakeimg.pl/600x400",
          content: 'Use hooks, memoize wisely...',
          status: 'published',
          publishedAt: new Date(),
        },
      ],
    },
  },
]

async function main() {
  console.log('🌱 Seeding database...')
  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }
  console.log('✅ Seeding complete.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
