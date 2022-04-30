import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

export default class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug: slugify(title, { lower: true }),
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug: slugify(title, { lower: true }),
      },
    });
  }
}
