import {Client} from "@notionhq/client";
import type {NextApiRequest, NextApiResponse} from "next";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
   auth: notionSecret,
});

type Row = {
   title: { id: String; title: { text: { content: String } } [] }
   description: { id: String; rich_text: { text: { content: String } } [] }
   status: { id: String; select: {name: String} }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (!notionSecret || !notionDatabaseId)
      throw new Error("Missing notion secret or DB-ID");

   const query = await notion.databases.query({
      database_id: notionDatabaseId,
   });

   //retrieve database to get the schema
   // console.log(await notion.databases.retrieve({database_id: notionDatabaseId}));

   //@ts-ignore
   const rows = query.results.map((res) => res.properties) as Row[];
   const rowStructured: rowsStructured = rows.map((row) => ({
      title: row.title.title[0].text.content,
      description: row.description.rich_text[0].text.content,
      status: row.status.select.name,
   }));

   // console.log(rowStructured)

   res.status(200).json(JSON.stringify(rowStructured));
}