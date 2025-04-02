import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  DownloadIcon, 
  Calendar, 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  TrendingDown,
  PoundSterlingIcon
} from "lucide-react";

// Sample data for the charts
const monthlyFaultData = [
  { name: 'Jan', faults: 28, resolved: 24 },
  { name: 'Feb', faults: 32, resolved: 30 },
  { name: 'Mar', faults: 35, resolved: 32 },
  { name: 'Apr', faults: 30, resolved: 25 },
  { name: 'May', faults: 40, resolved: 35 },
  { name: 'Jun', faults: 45, resolved: 38 },
  { name: 'Jul', faults: 42, resolved: 40 },
  { name: 'Aug', faults: 38, resolved: 36 },
  { name: 'Sep', faults: 50, resolved: 45 },
  { name: 'Oct', faults: 55, resolved: 48 },
  { name: 'Nov', faults: 48, resolved: 44 },
  { name: 'Dec', faults: 42, resolved: 40 },
];

const equipmentTypeData = [
  { name: 'Barriers', value: 35 },
  { name: 'Ticket Machines', value: 25 },
  { name: 'Payment Terminals', value: 20 },
  { name: 'CCTV', value: 15 },
  { name: 'Lighting', value: 5 },
];

const faultStatusData = [
  { name: 'Outstanding', value: 32 },
  { name: 'Parts Ordered', value: 18 },
  { name: 'Completed', value: 50 },
];

const carParkUsageData = [
  { name: 'Mon', central: 80, north: 65, west: 70 },
  { name: 'Tue', central: 85, north: 68, west: 75 },
  { name: 'Wed', central: 90, north: 72, west: 78 },
  { name: 'Thu', central: 88, north: 70, west: 76 },
  { name: 'Fri', central: 95, north: 75, west: 80 },
  { name: 'Sat', central: 100, north: 90, west: 95 },
  { name: 'Sun', central: 75, north: 60, west: 65 },
];

const commonMaintenanceFaults = [
  { name: 'Barrier Malfunction', value: 32 },
  { name: 'Ticket Printer Error', value: 26 },
  { name: 'Payment Terminal', value: 22 },
  { name: 'Camera Issues', value: 15 },
  { name: 'Lighting Problems', value: 12 },
  { name: 'Others', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28AF9', '#FB6962'];

// New data for revenue lost due to equipment downtime
const revenueLossByAsset = [
  { name: 'Barrier A', revenue: 3200, downtime: 24 },
  { name: 'Ticket Machine B', revenue: 2800, downtime: 18 },
  { name: 'Payment Terminal C', revenue: 4500, downtime: 36 },
  { name: 'Barrier D', revenue: 1900, downtime: 12 },
  { name: 'CCTV System E', revenue: 800, downtime: 8 },
];

// Monthly trend of revenue loss
const monthlyRevenueLoss = [
  { name: 'Jan', loss: 2800 },
  { name: 'Feb', loss: 3200 },
  { name: 'Mar', loss: 4500 },
  { name: 'Apr', loss: 3800 },
  { name: 'May', loss: 5200 },
  { name: 'Jun', loss: 4100 },
  { name: 'Jul', loss: 3600 },
  { name: 'Aug', loss: 2900 },
  { name: 'Sep', loss: 4700 },
  { name: 'Oct', loss: 5500 },
  { name: 'Nov', loss: 4900 },
  { name: 'Dec', loss: 3700 },
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('year');
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">View and analyze parking system data</p>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faults">Fault Reports</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Impact</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 flex items-center justify-end gap-2">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="quarter">Last 90 days</SelectItem>
                  <SelectItem value="year">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Total Faults</CardTitle>
                    <CardDescription>Last 12 months</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">487</div>
                  <p className="text-xs text-muted-foreground">+12.4% from previous period</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                    <CardDescription>Last 12 months</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">+3.1% from previous period</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
                    <CardDescription>Last 12 months</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3 days</div>
                  <p className="text-xs text-muted-foreground">-0.5 days from previous period</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fault Reports vs. Resolutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyFaultData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="faults" fill="#8884d8" name="Reported" />
                        <Bar dataKey="resolved" fill="#82ca9d" name="Resolved" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Fault Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={faultStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {faultStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="faults" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fault Trends (Last 12 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyFaultData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="faults" stroke="#8884d8" activeDot={{ r: 8 }} name="Total Faults" />
                        <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Common Maintenance Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={commonMaintenanceFaults}
                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" name="Frequency" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="equipment" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Equipment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={equipmentTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {equipmentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Equipment Reliability Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Barriers', score: 8.5 },
                          { name: 'Ticket Machines', score: 7.2 },
                          { name: 'Payment Terminals', score: 8.0 },
                          { name: 'CCTV', score: 9.3 },
                          { name: 'Lighting', score: 8.7 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8884d8" name="Reliability (0-10)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Car Park Usage (% Occupancy)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={carParkUsageData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="central" stroke="#8884d8" name="Central Mall" />
                      <Line type="monotone" dataKey="north" stroke="#82ca9d" name="North Terminal" />
                      <Line type="monotone" dataKey="west" stroke="#ffc658" name="West Shopping" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Peak Hour Usage</CardTitle>
                    <CardDescription>Average across all car parks</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14:00 - 17:00</div>
                  <p className="text-xs text-muted-foreground">85% average occupancy</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Busiest Car Park</CardTitle>
                    <CardDescription>Based on average occupancy</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Central Mall</div>
                  <p className="text-xs text-muted-foreground">89% average occupancy</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Average Stay Duration</CardTitle>
                    <CardDescription>All car parks</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.7 hours</div>
                  <p className="text-xs text-muted-foreground">+0.3 hours from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Total Revenue Lost</CardTitle>
                    <CardDescription>Due to equipment downtime</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <PoundSterlingIcon className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">£42,300</div>
                  <p className="text-xs text-muted-foreground">+8.2% from previous period</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Most Costly Downtime</CardTitle>
                    <CardDescription>Equipment with highest impact</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Payment Terminal C</div>
                  <p className="text-xs text-muted-foreground">£4,500 revenue impact</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Average Cost Per Downtime Hour</CardTitle>
                    <CardDescription>Across all equipment</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£125</div>
                  <p className="text-xs text-muted-foreground">-3.5% from previous period</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Revenue Lost by Asset</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueLossByAsset}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Revenue Lost"]} />
                        <Bar dataKey="revenue" fill="#ea384c" name="Revenue Lost (£)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monthly Revenue Loss Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyRevenueLoss}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Revenue Lost"]} />
                        <Legend />
                        <Line type="monotone" dataKey="loss" stroke="#ea384c" activeDot={{ r: 8 }} name="Revenue Lost (£)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Revenue Impact vs. Downtime Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueLossByAsset}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#ea384c" />
                      <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" fill="#ea384c" name="Revenue Lost (£)" />
                      <Bar yAxisId="right" dataKey="downtime" fill="#8884d8" name="Downtime Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Import missing icons at the top of the file
import { ClipboardList, CheckCircle, Clock } from 'lucide-react';

export default AnalyticsPage;
