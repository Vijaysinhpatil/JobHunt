import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  // const tableData = [
  //   {
  //     Date: "12/02/2025",
  //     Company: "Microsoft",
  //     Role: "Software Dev",
  //     Status: "Accepted",
  //   },
  //   {
  //     Date: "13/03/2025",
  //     Company: "Google",
  //     Role: "Frontend Engineer",
  //     Status: "Pending",
  //   },
  //   {
  //     Date: "25/03/2025",
  //     Company: "Amazon",
  //     Role: "Backend Developer",
  //     Status: "Rejected",
  //   },
  //   {
  //     Date: "28/04/2025",
  //     Company: "Meta",
  //     Role: "Full Stack Dev",
  //     Status: "Accepted",
  //   },
  //   {
  //     Date: "01/05/2025",
  //     Company: "Netflix",
  //     Role: "React Developer",
  //     Status: "Pending",
  //   },
  // ];

  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusColor = (status) => {

    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border border-yellow-500/30";
      case "accepted":
        return "text-green-400 bg-green-400/10 border border-green-500/30";
      case "rejected":
        return "text-red-400 bg-red-400/10 border border-red-500/30";
      default:
        return "text-gray-300 bg-gray-700/40 border border-gray-600";
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md text-center">
      <Table>
        <TableCaption className="text-gray-400 text-sm pt-4">
          Application Status Overview
        </TableCaption>

        {/* Table Header */}
        <TableHeader>
          <TableRow className="border-b border-gray-700 hover:bg-gray-800/40">
            <TableHead className="text-gray-300 font-semibold text-sm uppercase tracking-wide  text-center">
              Date
            </TableHead>
            <TableHead className="text-gray-300 font-semibold text-sm uppercase tracking-wide  text-center">
              Company
            </TableHead>
            <TableHead className="text-gray-300 font-semibold text-sm uppercase tracking-wide  text-center">
              Job Role
            </TableHead>
            <TableHead className="text-gray-300 font-semibold text-sm uppercase tracking-wide text-center">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {allAppliedJobs.length >= 0 ? (
            allAppliedJobs.map((appliedJobs) => (
              <TableRow className="border-b border-gray-800 hover:bg-gray-800/50 transition-all duration-200">
                <TableCell className="text-gray-300 text-sm">
                  {appliedJobs?.job?.createdAt?.split("T")[0] || " - "}
                </TableCell>
                <TableCell className="text-gray-200 font-medium">
                  {appliedJobs?.job?.company?.CompanyName || " - "}
                </TableCell>
                <TableCell className="text-gray-300">
                  {appliedJobs?.job?.title || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appliedJobs.status
                    )}`}
                  >
                    {appliedJobs.status === "pending" ? appliedJobs.status : appliedJobs.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span>didn't find any jobs that u were applies</span>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
