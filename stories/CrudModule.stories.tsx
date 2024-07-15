import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { RJSFSchema } from "@rjsf/utils";
import { CrudModule } from "@concepta/react-material-ui";
import {
  mockRequestDataGen,
  MockRequestDataGenParams,
} from "./mockRequestDataGen";

const meta = {
  component: CrudModule,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    hideDeleteButton: { control: "boolean" },
    formContainerVariation: {
      control: {
        type: "radio",
        options: ["drawer", "modal"],
      },
    },
  },
  args: {
    resource: "user",
    tableProps: {
      tableSchema: [
        {
          id: "id",
          label: "ID",
        },
        {
          id: "name",
          label: "Name",
        },
        {
          id: "email",
          label: "Email",
        },
        {
          id: "age",
          label: "Age",
        },
      ],
      filters: [
        {
          id: "name",
          label: "Search",
          operator: "contL",
          type: "text",
          columns: 4,
        },
        {
          id: "age",
          label: "Select",
          operator: "eq",
          type: "select",
          columns: 4,
          options: [
            {
              label: "24",
              value: "24",
            },
            {
              label: "25",
              value: "25",
            },
            {
              label: "26",
              value: "26",
            },
          ],
        },
      ],
    },
  },
} satisfies Meta<typeof CrudModule>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonSchema: RJSFSchema = {
  type: "object",
  title: "User Details",
  properties: {
    name: { type: "string", title: "Name" },
    age: { type: "string", title: "Age" },
    email: { type: "string", title: "Email" },
  },
};

export const MockedError: Story = {
  args: {
    resource: "wrong-path",
    title: "Users",
    hideDeleteButton: false,
    formContainerVariation: "drawer",
    createFormProps: {
      formSchema: commonSchema,
    },
    detailsFormProps: {
      formSchema: commonSchema,
    },
  },
};

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:6006/user", ({ request }) => {
          console.log("request", request);
          const url = new URL(request.url);
          const limit = url.searchParams.get("limit");
          const page = url.searchParams.get("page");
          const sort = url.searchParams.get("sort");

          return HttpResponse.json(
            mockRequestDataGen({
              limit: limit ? Number(limit) : 5,
              page: page ? Number(page) : 1,
              sort: sort as MockRequestDataGenParams["sort"],
              total: 100,
            })
          );
        }),
      ],
    },
  },
  args: {
    title: "Users",
    hideDeleteButton: false,
    formContainerVariation: "drawer",
    createFormProps: {
      formSchema: commonSchema,
    },
    detailsFormProps: {
      formSchema: commonSchema,
    },
  },
};
