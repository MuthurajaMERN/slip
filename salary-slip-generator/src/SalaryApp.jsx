import React, { useState } from 'react';
import './App.css';

function App() {
  const [employeeDetails, setEmployeeDetails] = useState({
    employeeName: "",
    employeeID: "",
    designation: "",
    dateOfJoining: "",
    payPeriod: "",
    payDate: "",
    pfAccountNumber: "",
    uanNumber: "",
    pannumber: "",
    leavetaken: "",
    totalworkingDays: "",
    basicSalary: 0,
    hraPercentage: 20,
    conveyanceAllowancePercentage: 10,
    childrenEducationAllowancePercentage: 5,
    dearnessAllowancePercentage: 15,
    otherAllowancePercentage: 10,
    epfContributionPercentage: 12,
    incomeTaxPercentage: 10,
    telephoneReimbursementPercentage: 5,
    fuelReimbursementPercentage: 5,
    esiPercentage: 5,
    lopPercentage: 5,
    insurancePercentage: 5
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({
      ...employeeDetails,
      [name]: value
    });
  };

  const calculateSalary = () => {
    const basicSalary = parseFloat(employeeDetails.basicSalary);
    const hra = (basicSalary * employeeDetails.hraPercentage) / 100;
    const conveyanceAllowance = (basicSalary * employeeDetails.conveyanceAllowancePercentage) / 100;
    const childrenEducationAllowance = (basicSalary * employeeDetails.childrenEducationAllowancePercentage) / 100;
    const dearnessAllowance = (basicSalary * employeeDetails.dearnessAllowancePercentage) / 100;
    const otherAllowance = (basicSalary * employeeDetails.otherAllowancePercentage) / 100;
    const epfContribution = (basicSalary * employeeDetails.epfContributionPercentage) / 100;
    const incomeTax = (basicSalary * employeeDetails.incomeTaxPercentage) / 100;
    const telephoneReimbursement = (basicSalary * employeeDetails.telephoneReimbursementPercentage) / 100;
    const fuelReimbursement = (basicSalary * employeeDetails.fuelReimbursementPercentage) / 100;
    const esi = (basicSalary * employeeDetails.esiPercentage) / 100;
    const lop = (basicSalary * employeeDetails.lopPercentage) / 100;
    const insurance = (basicSalary * employeeDetails.insurancePercentage) / 100;

    return {
      hra,
      conveyanceAllowance,
      childrenEducationAllowance,
      dearnessAllowance,
      otherAllowance,
      epfContribution,
      incomeTax,
      telephoneReimbursement,
      fuelReimbursement,
      esi,
      lop,
      insurance,
      totalEarnings: basicSalary + hra + conveyanceAllowance + childrenEducationAllowance + dearnessAllowance + otherAllowance,
      totalDeductions: epfContribution + incomeTax + telephoneReimbursement + fuelReimbursement + esi + lop + insurance,
      netSalary: basicSalary + hra + conveyanceAllowance + childrenEducationAllowance + dearnessAllowance + otherAllowance - epfContribution - incomeTax - telephoneReimbursement - fuelReimbursement - esi - lop - insurance
    };
  };

  const salaryDetails = calculateSalary();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Payslip Generator</h1>
      <div className="border p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Employee Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "EmployeeName", type: "text" },
            { key: "EmployeeID", type: "text" },
            { key: "Designation", type: "text" },
            { key: "DateOfJoining", type: "date" },
            { key: "PayPeriod", type: "date" },
            { key: "PayDate", type: "date" },
            { key: "PfAccountNumber", type: "text" },
            { key: "UanNumber", type: "text" },
            { key: "PanNumber", type: "text" },
            { key: "Leavetaken", type: "text" },
            { key: "TotalworkingDays", type: "text" }
          ].map((field) => (
            <div key={field.key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{field.key}</label>
              <input
                type={field.type}
                name={field.key}
                value={employeeDetails[field.key]}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Salary Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={employeeDetails.basicSalary}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {["hraPercentage", "conveyanceAllowancePercentage", "childrenEducationAllowancePercentage", "dearnessAllowancePercentage", "otherAllowancePercentage", "epfContributionPercentage", "incomeTaxPercentage", "telephoneReimbursementPercentage", "fuelReimbursementPercentage", "esiPercentage", "lopPercentage", "insurancePercentage"].map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type="number"
                name={key}
                value={employeeDetails[key]}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-left mt-44 ml-10">
      <img src="/assets/solution.png" alt="Logo" className="w-full h-auto" />
      <h1 className="text-2xl font-bold"><span className='text-blue-600'>UltraFly</span><span className='text-yellow-600'>Solutions</span></h1>
        <p>No.27/9, NivedhVikas, 3rdFloor, Pankaja Mill Road, Puliakulam, Coimbatore-641045</p>
      </div>

      <hr className="my-8" />

      <div className="bg-gray-50 p-10 shadow-lg rounded-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Employee Details (Left Side) */}
          <div className="col-span-2 bg-white p-8 shadow-lg rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-3"><span className='text-lg ml-10'>Employee Details</span></h2>
            <div className="space-y-5">
              {[
                { label: "Employee Name", key: "employeeName" },
                { label: "Employee ID", key: "employeeID" },
                { label: "Designation", key: "designation" },
                { label: "Date of Joining", key: "dateOfJoining" },
                { label: "Pay Period", key: "payPeriod" },
                { label: "Pay Date", key: "payDate" },
                { label: "PF Account Number", key: "pfAccountNumber" },
                { label: "UAN Number", key: "uanNumber" },
                { label: "PAN Number", key: "pannumber" },
                { label: "Leave Taken", key: "leavetaken" },
                { label: "Total Working Days", key: "totalworkingDays" },
              ].map((item) => (
                <div key={item.key} className="flex justify-between">
                  <span className="text-gray-600 font-medium">{item.label}:</span>
                  <span className="text-gray-900">{employeeDetails[item.key] || "N/A"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Net Salary Box (Right Side) */}
          <div className="bg-green-100 text-green-800 text-center p-8 shadow-lg rounded-lg flex flex-col justify-center w-full">
            <h2 className="text-2xl font-semibold">Net Salary</h2>
            <p className="text-4xl font-bold mt-4">₹{salaryDetails.netSalary}</p>
          </div>
        </div>

        <hr className="my-20" />

        {/* Earnings & Deductions Table */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Earnings Section */}
          <div className="bg-white p-8 shadow-lg rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-6">Earnings</h2>
            <div className="space-y-5">
              {[
                { label: "Basic Salary", value: employeeDetails.basicSalary },
                { label: "HRA", value: salaryDetails.hra },
                { label: "Conveyance Allowance", value: salaryDetails.conveyanceAllowance },
                { label: "Children Education Allowance", value: salaryDetails.childrenEducationAllowance },
                { label: "Dearness Allowance", value: salaryDetails.dearnessAllowance },
                { label: "Other Allowance", value: salaryDetails.otherAllowance },
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-900 font-semibold">₹{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deductions Section */}
          <div className="bg-white p-8 shadow-lg rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-6">Deductions</h2>
            <div className="space-y-5">
              {[
                { label: "EPF Contribution", value: salaryDetails.epfContribution },
                { label: "Income Tax", value: salaryDetails.incomeTax },
                { label: "LOP", value: salaryDetails.lop },
                { label: "Insurance", value: salaryDetails.insurance },
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-900 font-semibold">₹{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-gray-100 p-6 shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Total Salary Breakdown</h2>
        <p className="text-lg font-medium">Total Earnings: <span className="text-green-600 font-bold">₹{salaryDetails.totalEarnings}</span></p>
        <p className="text-lg font-medium">Total Deductions: <span className="text-red-600 font-bold">₹{salaryDetails.totalDeductions}</span></p>
      </div>

    </div>
  );
}

export default App;
