import { FormType } from "../pages/models/FormTypes/Form";
import { SortType } from "../pages/models/TableTypes/Table";

export const handleSort = (
  title: string,
  setSortedOrder: React.Dispatch<React.SetStateAction<SortType>>,
  setDataValue: React.Dispatch<React.SetStateAction<FormType[]>>,
  dataValue: FormType[],
  sortedOrder: SortType,
  items: FormType[],
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  let cloneData;
  switch (title) {
    case "amount":
      if (sortedOrder.key !== title || sortedOrder.direction === "asc") {
        cloneData = dataValue.sort((a, b) => a[title] - b[title]);
        setDataValue(cloneData);
        setSortedOrder({ key: title, direction: "desc" });
      } else if (sortedOrder.direction === "desc") {
        cloneData = dataValue.sort((a, b) => b[title] - a[title]);
        setDataValue(cloneData);
        setSortedOrder({ key: title, direction: null });
      } else {
        setDataValue(items);
        setSortedOrder({ key: title, direction: "asc" });
      }
      break;

    case "date":
      if (sortedOrder.key !== title || sortedOrder.direction === "asc") {
        cloneData = dataValue.sort(
          (a, b) => new Date(a[title]).getTime() - new Date(b[title]).getTime()
        );
        setDataValue(cloneData);
        setSortedOrder({ key: title, direction: "desc" });
      } else if (sortedOrder.direction === "desc") {
        cloneData = dataValue.sort(
          (a, b) => new Date(b[title]).getTime() - new Date(a[title]).getTime()
        );
        setDataValue(cloneData);
        setSortedOrder({ key: title, direction: null });
      } else {
        setDataValue(items);
        setSortedOrder({ key: title, direction: "asc" });
      }
      break;

    default:
      if (sortedOrder.key !== title || sortedOrder.direction === "asc") {
        cloneData = dataValue.sort((a, b) =>
          a[title as keyof FormType] > b[title as keyof FormType] ? 1 : -1
        );
        setDataValue(cloneData);
        setSortedOrder({ key: title, direction: "desc" });
      } else if (sortedOrder.direction === "desc") {
        cloneData = dataValue.sort((a: any, b: any) =>
          a[title] < b[title] ? 1 : -1
        );
        setDataValue(cloneData);
        setSortedOrder({ key: title, direction: null });
      } else {
        setDataValue(items);
        setSortedOrder({ key: title, direction: "asc" });
      }
  }
  setCurrentPage(1);
};
