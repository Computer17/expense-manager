import * as XLSX from 'xlsx';

export const downloadExpensesAsExcel = (expenses, fileName) => {
  if (!expenses || expenses.length === 0) return false;

  const wsData = [
    ['ক্রমিক', 'তারিখ', 'বিবরণ', 'রেফারেন্স', 'টাকা (৳)']
  ];
  expenses.forEach((e) => {
    wsData.push([e.serial, e.date, e.details, e.reference || '', e.amount]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'খরচের তালিকা');
  XLSX.writeFile(wb, fileName + '.xlsx');
  return true;
};