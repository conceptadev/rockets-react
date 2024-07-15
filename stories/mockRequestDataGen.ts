import { userName, userSurname, emailDomain } from "./fakeData";

interface MockRequestDataGenParams {
  limit: number;
  page: number;
  total: number;
  sort: "ASC" | "DESC";
}

const mockRequestDataGen = (params: MockRequestDataGenParams) => {
  const { limit, page, sort, total } = params;
  const data = [];
  // TODO: Fix this function to work with pagination
  // generate data based on index. Same index will always have same name, surname and email
  for (let i = 0; i < limit; i++) {
    const name = userName[i % userName.length];
    const surname = userSurname[i % userSurname.length];
    const email = `${name}.${surname}@${emailDomain[i % emailDomain.length]}`;
    data.push({ name, surname, email });
  }

  // for (let i = 0; i < limit; i++) {
  //   const name = userName[Math.floor(Math.random() * userName.length)];
  //   const surname = userSurname[Math.floor(Math.random() * userSurname.length)];
  //   const email = `${name}.${surname}@${emailDomain[Math.floor(Math.random() * emailDomain.length)]}`;
  //   data.push({ name, surname, email });
  // }
  return {
    data,
    count: limit,
    total: total,
    page: page,
    pageCount: total / limit,
  };
};

export { mockRequestDataGen };
export type { MockRequestDataGenParams };
