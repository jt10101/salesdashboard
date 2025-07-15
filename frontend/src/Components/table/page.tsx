import { columns, Hierarcy } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Hierarcy[]> {
  // Fetch data from your API here.
  return [
    {
      salespersonid: "728ed52f",
      firstname: "Jacob",
      lastname: "Tham",
      email: "m@example.com",
      supervisorid: "12345",
    },
  ];
}

const DemoPage = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export { DemoPage };
