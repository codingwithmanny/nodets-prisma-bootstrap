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
 * List
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
  console.group('QUERY_USERS');
  console.log({ query });
  console.log({ take });
  console.log({ skip });
  console.log({ orderBy });
  console.log({ sort });

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

  console.groupEnd();
  return { data, pagination };
};

/**
 * Read
 * @param id
 */
export const QUERY_USER = async (id: string) => {
  console.group('QUERY_USER');
  console.log({ id });

  const data = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  console.groupEnd();
  return { data };
};

/**
 * Create
 * @param data
 * @returns
 */
export const CREATE_USER = async (
  payload: Omit<User, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  console.group('CREATE_USER');
  console.log({ payload });

  const create: typeof payload = payload;

  const data = await prisma.user.create({
    data: create,
  });

  console.groupEnd();
  return { data };
};

/**
 * Update
 * @param id
 * @param data
 * @returns
 */
export const UPDATE_USER = async (
  id: string,
  payload: Omit<Partial<User>, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  console.group('UPDATE_USER');
  console.log({ id });
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

  console.groupEnd();
  return { data };
};

/**
 * Delete
 * @param id
 */
export const DELETE_USER = async (id: string) => {
  console.group('DELETE_USER');
  console.log({ id });

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

  console.groupEnd();
  return { data };
};
