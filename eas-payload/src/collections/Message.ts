import { CollectionConfig } from "payload/types";

const Message: CollectionConfig = {
  slug: "message",
  admin: {
    useAsTitle: "text",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "text",
      type: "textarea",
      required: true,
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "target",
      type: "relationship",
      relationTo: "users",
    },
  ],
};

export default Message;
