// Imports
// ========================================================
import { PrismaClient, Prisma } from '@prisma/client';
import { QueryUserFilters, User } from './types';

// Config
// ========================================================
const prisma = new PrismaClient();

// Queries
// ========================================================
/**
 *
 * @param param0
 * @returns
 */
export const QUERY_USERS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
}: QueryUserFilters) => {
  const optionOrderBy = ['id', 'firstName', 'lastName', 'email'].includes(
    orderBy,
  )
    ? orderBy
    : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.UserFindManyArgs = {};

  if (query) {
    options.where = {
      OR: [
        {
          firstName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  options.orderBy = {
    [optionOrderBy]: optionSort,
  };

  const pagination = {
    query,
    take,
    skip,
    orderBy: optionOrderBy,
    sort: optionSort,
    total: await prisma.user.count(options as Prisma.UserCountArgs),
  };

  options.take = take;
  options.skip = skip;

  const data = await prisma.user.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 */
export const QUERY_USER = async (id: string) => {
  const data = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const UPDATE_USER = async (id: string, payload: Partial<User>) => {
  console.log({ payload });
  if (
    !(await prisma.user.findFirst({
      where: {
        id,
      },
    }))
  )
    return { data: null };

  const update: Partial<User> = {};

  if (payload?.firstName) {
    update.firstName = payload.firstName;
  }

  if (payload?.lastName) {
    update.lastName = payload.lastName;
  }

  if (payload?.email) {
    update.email = payload.email;
  }

  if (Object.keys(payload)?.length > 0) {
    update.updatedAt = new Date();
  }

  const data = await prisma.user.update({
    where: {
      id,
    },
    data: update,
  });

  return { data };
};

/**
 *
 * @param id
 */
export const DELETE_USER = async (id: string) => {
  if (
    !(await prisma.user.findFirst({
      where: {
        id,
      },
    }))
  )
    return { data: null };

  const data = await prisma.user.delete({
    where: {
      id,
    },
  });

  return { data };
};
