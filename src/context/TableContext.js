import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import {
  getTables,
  setTables,
  getTableData,
  setTableData,
  removeTableData,
  getLastTable,
  setLastTable,
} from '@/services/storage';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const { user } = useAuth();
  const [tables, setTablesState] = useState([]);
  const [currentTable, setCurrentTable] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user) return;
    const userTables = getTables(user.email);
    setTablesState(userTables);

    const last = getLastTable(user.email);
    if (last && userTables.includes(last)) {
      setCurrentTable(last);
    } else if (userTables.length > 0) {
      setCurrentTable(userTables[0]);
      setLastTable(user.email, userTables[0]);
    } else {
      setCurrentTable('');
    }
  }, [user]);

  useEffect(() => {
    if (!user || !currentTable) {
      setExpenses([]);
      return;
    }
    const data = getTableData(user.email, currentTable);
    setExpenses(data);
  }, [user, currentTable]);

  const createTable = (name) => {
    if (!user) return false;
    const trimmed = name.trim();
    if (!trimmed) return false;
    if (tables.includes(trimmed)) return false;

    const newTables = [...tables, trimmed];
    setTables(user.email, newTables);
    setTablesState(newTables);
    setTableData(user.email, trimmed, []);
    setCurrentTable(trimmed);
    setLastTable(user.email, trimmed);
    return true;
  };

  const selectTable = (name) => {
    if (!user) return;
    setCurrentTable(name);
    setLastTable(user.email, name);
  };

  const deleteTable = (name) => {
    if (!user) return;
    const updated = tables.filter((t) => t !== name);
    setTables(user.email, updated);
    setTablesState(updated);
    removeTableData(user.email, name);
    if (currentTable === name) {
      setCurrentTable(updated.length > 0 ? updated[0] : '');
      if (updated.length > 0) setLastTable(user.email, updated[0]);
    }
  };

  const addExpense = (expense) => {
    if (!user || !currentTable) return false;
    const data = getTableData(user.email, currentTable);
    const serial = data.length + 1;
    const newEntry = { ...expense, serial };
    const newData = [...data, newEntry];
    setTableData(user.email, currentTable, newData);
    setExpenses(newData);
    return true;
  };

  const refreshExpenses = () => {
    if (!user || !currentTable) return;
    const data = getTableData(user.email, currentTable);
    setExpenses(data);
  };

  const value = {
    tables,
    currentTable,
    expenses,
    createTable,
    selectTable,
    deleteTable,
    addExpense,
    refreshExpenses,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export const useTables = () => useContext(TableContext);