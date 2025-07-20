import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  BarChart3,
  TrendingUp,
  Package,
  Users,
  AlertTriangle
} from "lucide-react";

const Report = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Remove reportTypes and recentReports arrays and any code that uses them

  const handleGenerateReport = () => {
    if (!selectedReport) return;
    
    // Simulate report generation
    console.log(`Generating ${selectedReport} report for ${dateRange.startDate} to ${dateRange.endDate}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate comprehensive stock and activity reports
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reports Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">15.2K</div>
            <p className="text-sm text-muted-foreground">Records analyzed</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Report Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{/* reportTypes.length */}</div>
            <p className="text-sm text-muted-foreground">Available formats</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-sm text-muted-foreground">Auto-generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generator */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Generate New Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {reportTypes.map((report) => ( */}
                    {/*   <SelectItem key={report.id} value={report.id}> */}
                    {/*     {report.name} */}
                    {/*   </SelectItem> */}
                    {/* ))} */}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({...prev, startDate: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({...prev, endDate: e.target.value}))}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={!selectedReport}
                  className="bg-primary hover:bg-primary-hover"
                >
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Available Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* {reportTypes.map((report) => { */}
              {/*   const Icon = report.icon; */}
              {/*   return ( */}
              {/*     <div  */}
              {/*       key={report.id}  */}
              {/*       className="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" */}
              {/*       onClick={() => setSelectedReport(report.id)} */}
              {/*     > */}
              {/*       <div className={`p-2 rounded-lg ${report.color} mr-3`}> */}
              {/*         <Icon className="w-5 h-5 text-white" /> */}
              {/*       </div> */}
              {/*       <div className="flex-1"> */}
              {/*         <h4 className="font-medium text-foreground">{report.name}</h4> */}
              {/*         <p className="text-sm text-muted-foreground">{report.description}</p> */}
              {/*       </div> */}
              {/*       {selectedReport === report.id && ( */}
              {/*         <Badge variant="default">Selected</Badge> */}
              {/*       )} */}
              {/*     </div> */}
              {/*   ); */}
              {/* })} */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* {recentReports.map((report, index) => ( */}
            {/*   <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"> */}
            {/*     <div className="flex items-center space-x-3"> */}
            {/*       <FileText className="w-8 h-8 text-primary" /> */}
            {/*       <div> */}
            {/*         <h4 className="font-medium text-foreground">{report.name}</h4> */}
            {/*         <div className="flex items-center space-x-2 text-sm text-muted-foreground"> */}
            {/*           <Calendar className="w-4 h-4" /> */}
            {/*           <span>Generated on {new Date(report.generatedDate).toLocaleDateString()}</span> */}
            {/*         </div> */}
            {/*       </div> */}
            {/*     </div> */}
            {/*     <div className="flex items-center space-x-2"> */}
            {/*       <Badge className="bg-success text-success-foreground"> */}
            {/*         {report.status} */}
            {/*       </Badge> */}
            {/*       <Button variant="outline" size="sm"> */}
            {/*         <Download className="w-4 h-4 mr-2" /> */}
            {/*         Download */}
            {/*       </Button> */}
            {/*     </div> */}
            {/*   </div> */}
            {/* ))} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;