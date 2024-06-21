import React from "react";
import UniversityLayout from "../../layout/UniversityLayout";
import WelcomeCard from "../../components/WelcomeCard";
import TableGrid from "../../components/TableGrid";
import { useSelector } from "react-redux";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "6",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "7",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "8",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "9",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "10",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

const Dashboard = () => {
  const userName = useSelector((state) => state.auth.user?.name || 'Guest');
  return (
    <UniversityLayout>
      <WelcomeCard name={userName}></WelcomeCard>
      <TableGrid
        columns={columns}
        rows={rows}
        rowsPerPage={7}
        name={"Recenet Applications"}
      ></TableGrid>
    </UniversityLayout>
  );
};

export default Dashboard;
