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
    setEmployeeDetails((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  const calculateSalary = () => {
    const basicSalary = parseFloat(employeeDetails.basicSalary) || 0;
    const totalWorkingDays = parseFloat(employeeDetails.TotalworkingDays) || 0;
    const leaveTaken = parseFloat(employeeDetails.Leavetaken) || 0;
  
    const hra = (basicSalary * (parseFloat(employeeDetails.hraPercentage) || 0)) / 100;
    const conveyanceAllowance = (basicSalary * (parseFloat(employeeDetails.conveyanceAllowancePercentage) || 0)) / 100;
    const childrenEducationAllowance = (basicSalary * (parseFloat(employeeDetails.childrenEducationAllowancePercentage) || 0)) / 100;
    const dearnessAllowance = (basicSalary * (parseFloat(employeeDetails.dearnessAllowancePercentage) || 0)) / 100;
    const otherAllowance = (basicSalary * (parseFloat(employeeDetails.otherAllowancePercentage) || 0)) / 100;
  
    const epfContribution = (basicSalary * (parseFloat(employeeDetails.epfContributionPercentage) || 0)) / 100;
    const incomeTax = (basicSalary * (parseFloat(employeeDetails.incomeTaxPercentage) || 0)) / 100;
    const telephoneReimbursement = (basicSalary * (parseFloat(employeeDetails.telephoneReimbursementPercentage) || 0)) / 100;
    const fuelReimbursement = (basicSalary * (parseFloat(employeeDetails.fuelReimbursementPercentage) || 0)) / 100;
    const esi = (basicSalary * (parseFloat(employeeDetails.esiPercentage) || 0)) / 100;
    const insurance = (basicSalary * (parseFloat(employeeDetails.insurancePercentage) || 0)) / 100;
  
    // ✅ Corrected LOP Calculation
    const lop = totalWorkingDays > 0 
    ? Math.round((basicSalary / totalWorkingDays) * leaveTaken) 
    : 0;  
    // ✅ Calculate Total Earnings & Deductions
    const totalEarnings = basicSalary + hra + conveyanceAllowance + childrenEducationAllowance + dearnessAllowance + otherAllowance;
    const totalDeductions = epfContribution + incomeTax + telephoneReimbursement + fuelReimbursement + esi + lop + insurance;
  
    const netSalary = (totalEarnings - totalDeductions).toFixed(2);

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
      totalEarnings,
      totalDeductions,
      netSalary
    };
  };
  

  const salaryDetails = calculateSalary();

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r  text-transparent bg-clip-text">
  <span className="text-blue-400">Employee Payslip</span> <span className="text-yellow-400">Generator</span>  
</h1>

<div className="border-2 border-gray-300 p-6 rounded-xl shadow-lg  bg-slate-200">
  <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Employee Details</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    { key: "employeeName", type: "text" },
    { key: "employeeID", type: "text" },
    { key: "designation", type: "text" },
    { key: "dateOfJoining", type: "date" },
    { key: "payPeriod", type: "date" },
    { key: "payDate", type: "date" },
    { key: "pfAccountNumber", type: "text" },
    { key: "uanNumber", type: "text" },
    { key: "panNumber", type: "text" },
    { key: "leaveTaken", type: "text" },
    { key: "totalWorkingDays", type: "text" }
  ].map((field) => (
    <div key={field.key} className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-800">
        {field.key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()}
      </label>
      <input
        type={field.type}
        name={field.key}
        value={employeeDetails[field.key] || ""}
        onChange={handleInputChange}
        className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all ease-in-out duration-200"
      />
    </div>
  ))}
</div>
  <div className="mt-6 text-center">
    <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
      Generate Payslip
    </button>
  </div>
</div>


<div className="border-2 bg-slate-200 border-gray-300 p-6 mb-6 rounded-xl bg-gray-50 shadow-sm">
  <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Salary Details</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Basic Salary Input */}
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-800">Basic Pay</label>
      <input
        type="number"
        name="basicSalary"
        placeholder="Enter Basic Pay"
        value={employeeDetails.basicSalary}
        onChange={handleInputChange}
        className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all ease-in-out duration-200 bg-white"
      />
    </div>

    {/* Dynamic Fields */}
    {[
      { key: "hraPercentage", label: "HRA (%)" },
      { key: "conveyanceAllowancePercentage", label: "Conveyance (%)" },
      { key: "childrenEducationAllowancePercentage", label: "Edu Allowance (%)" },
      { key: "dearnessAllowancePercentage", label: "DA (%)" },
      { key: "otherAllowancePercentage", label: "Other Allowance (%)" },
      { key: "epfContributionPercentage", label: "EPF (%)" },
      { key: "incomeTaxPercentage", label: "Income Tax (%)" },
      { key: "telephoneReimbursementPercentage", label: "Phone Reimb (%)" },
      { key: "fuelReimbursementPercentage", label: "Fuel Reimb (%)" },
      { key: "esiPercentage", label: "ESI (%)" },
      { key: "lopPercentage", label: "LOP (%)" },
      { key: "insurancePercentage", label: "Insurance (%)" }
    ].map(({ key, label }) => (
      <div key={key} className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-800">{label}</label>
        <input
          type="number"
          name={key}
          placeholder={`Enter ${label}`}
          value={employeeDetails[key]}
          onChange={handleInputChange}
          className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all ease-in-out duration-200 bg-white"
        />
      </div>
    ))}
  </div>

  <div className="mt-6 text-center">
    <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
      Calculate Salary
    </button>
  </div>
</div>


      <div className="text-left mt-44 ml-10">
  <img src="src/assets/solution.png" alt="Logo" className="w-25% h-24 justify-center" />
  <h1 className="text-2xl font-bold">
    <span className="text-blue-600">UltraFly</span>
    <span className="text-yellow-600">Solutions</span>
  </h1>
  <p>No.27/9, NivedhVikas, 3rd Floor, Pankaja Mill Road, Puliakulam, Coimbatore-641045</p>
</div>

      <hr className="my-8" />

      <div className="bg-gray-400 p-10  rounded-lg w-full">
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
