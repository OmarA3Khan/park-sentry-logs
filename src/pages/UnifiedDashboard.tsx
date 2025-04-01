import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  LayoutDashboard, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  BarChartIcon, 
  Cog, 
  ChevronDown, 
  ChevronUp,
  Info,
  DollarSign,
  TrendingDown,
  Search,
  Filter,
  X
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { Separator } from "@/components/ui/separator";
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
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

// Mock data for car parks
const carParks = ['Overview', 'Virginia Water', 'Cranbourne', 'Savill Garden', 'Wick', 'Rangers'];

// Mock data for the dashboard
const mockData = {
  stats: {
    totalAssets: 39,
    healthyAssets: 21,
    faultyAssets: 12,
    overdueAssets: 6,
    maintenanceInProgress: 5
  },
  recentFaults: [
    {
      id: 'F32145',
      carPark: 'Virginia Water',
      equipment: 'POF 3',
      description: 'Display showing error code E45',
      status: 'Outstanding',
      date: '2023-04-12',
      reportedBy: 'JD',
      daysOpen: 18,
      overdueBy: 3
    },
    {
      id: 'F32141',
      carPark: 'Savill Garden',
      equipment: 'Entry 1',
      description: 'Barrier not raising fully',
      status: 'In Progress',
      date: '2023-04-10',
      reportedBy: 'KA',
      daysOpen: 20
    },
    {
      id: 'F32137',
      carPark: 'Cranbourne',
      equipment: 'Exit 2',
      description: 'Card reader not accepting payments',
      status: 'Completed',
      date: '2023-04-08',
      reportedBy: 'TS',
      daysOpen: 5
    },
    {
      id: 'F32135',
      carPark: 'Virginia Water South',
      equipment: 'POF 1',
      description: 'Coin acceptor jammed',
      status: 'Completed',
      date: '2023-04-07',
      reportedBy: 'JD',
      daysOpen: 3
    },
  ],
  carParkData: {
    'Overview': { totalAssets: 39, healthyAssets: 21, faultyAssets: 12, overdueAssets: 6, inProgress: 5 },
    'Virginia Water': { totalAssets: 13, healthyAssets: 8, faultyAssets: 3, overdueAssets: 2, inProgress: 1 },
    'Cranbourne': { totalAssets: 8, healthyAssets: 4, faultyAssets: 2, overdueAssets: 1, inProgress: 1 },
    'Savill Garden': { totalAssets: 7, healthyAssets: 3, faultyAssets: 3, overdueAssets: 1, inProgress: 1 },
    'Wick': { totalAssets: 6, healthyAssets: 3, faultyAssets: 2, overdueAssets: 1, inProgress: 1 },
    'Rangers': { totalAssets: 5, healthyAssets: 3, faultyAssets: 2, overdueAssets: 0, inProgress: 1 }
  },
  equipment: {
    'Overview': [
      { type: 'Barrier Systems', total: 12, functional: 10, maintenance: 2 },
      { type: 'Payment Terminals', total: 16, functional: 14, faulty: 1, maintenance: 1 },
      { type: 'ANPR Cameras', total: 8, functional: 6, faulty: 2 }
    ],
    'Virginia Water': [
      { type: 'Barrier Systems', total: 4, functional: 3, maintenance: 1 },
      { type: 'Payment Terminals', total: 6, functional: 5, faulty: 1 },
      { type: 'ANPR Cameras', total: 3, functional: 2, faulty: 1 }
    ],
    'Cranbourne': [
      { type: 'Barrier Systems', total: 2, functional: 2 },
      { type: 'Payment Terminals', total: 3, functional: 3 },
      { type: 'ANPR Cameras', total: 2, functional: 1, faulty: 1 }
    ],
    'Savill Garden': [
      { type: 'Barrier Systems', total: 2, functional: 1, maintenance: 1 },
      { type: 'Payment Terminals', total: 3, functional: 2, maintenance: 1 },
      { type: 'ANPR Cameras', total: 1, functional: 1 }
    ],
    'Wick': [
      { type: 'Barrier Systems', total: 2, functional: 2 },
      { type: 'Payment Terminals', total: 2, functional: 2 },
      { type: 'ANPR Cameras', total: 1, functional: 1 }
    ],
    'Rangers': [
      { type: 'Barrier Systems', total: 2, functional: 2 },
      { type: 'Payment Terminals', total: 2, functional: 2 },
      { type: 'ANPR Cameras', total: 1, functional: 1 }
    ]
  },
  analytics: {
    'Overview': [
      { name: 'Jan', faults: 12 },
      { name: 'Feb', faults: 19 },
      { name: 'Mar', faults: 15 },
      { name: 'Apr', faults: 23 },
      { name: 'May', faults: 29 },
      { name: 'Jun', faults: 18 }
    ],
    'Virginia Water': [
      { name: 'Jan', faults: 5 },
      { name: 'Feb', faults: 8 },
      { name: 'Mar', faults: 6 },
      { name: 'Apr', faults: 10 },
      { name: 'May', faults: 12 },
      { name: 'Jun', faults: 7 }
    ],
    'Cranbourne': [
      { name: 'Jan', faults: 2 },
      { name: 'Feb', faults: 4 },
      { name: 'Mar', faults: 3 },
      { name: 'Apr', faults: 5 },
      { name: 'May', faults: 7 },
      { name: 'Jun', faults: 4 }
    ],
    'Savill Garden': [
      { name: 'Jan', faults: 3 },
      { name: 'Feb', faults: 4 },
      { name: 'Mar', faults: 3 },
      { name: 'Apr', faults: 4 },
      { name: 'May', faults: 5 },
      { name: 'Jun', faults: 3 }
    ],
    'Wick': [
      { name: 'Jan', faults: 1 },
      { name: 'Feb', faults: 2 },
      { name: 'Mar', faults: 2 },
      { name: 'Apr', faults: 3 },
      { name: 'May', faults: 3 },
      { name: 'Jun', faults: 2 }
    ],
    'Rangers': [
      { name: 'Jan', faults: 1 },
      { name: 'Feb', faults: 1 },
      { name: 'Mar', faults: 1 },
      { name: 'Apr', faults: 1 },
      { name: 'May', faults: 2 },
      { name: 'Jun', faults: 2 }
    ]
  },
  equipmentList: {
    'Overview': [
      {
        id: 'eq1',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Main building',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45678-A',
        lastMaintenance: '2023-01-20',
        status: 'Operational',
        faults: [
          {
            id: 'F32145',
            date: '2023-04-12',
            description: 'Display showing error code E45',
            status: 'Outstanding',
            reportedBy: 'JD',
          },
          {
            id: 'F31990',
            date: '2023-03-05',
            description: 'Card reader intermittently not accepting payments',
            status: 'Completed',
            reportedBy: 'KA',
          },
        ],
      },
      {
        id: 'eq2',
        name: 'POF 2',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Near exit',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45679-A',
        lastMaintenance: '2023-02-10',
        status: 'Operational',
        faults: [
          {
            id: 'F32100',
            date: '2023-03-25',
            description: 'Coin acceptor jammed',
            status: 'Completed',
            reportedBy: 'JD',
          },
        ],
      },
      {
        id: 'eq3',
        name: 'Entry 1',
        type: 'Entry',
        carPark: 'Virginia Water',
        location: 'Main entrance',
        installedDate: '2019-11-20',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-34567-B',
        lastMaintenance: '2023-01-15',
        status: 'Needs Attention',
        faults: [
          {
            id: 'F32142',
            date: '2023-04-11',
            description: 'Barrier not raising fully',
            status: 'Parts Ordered',
            reportedBy: 'KA',
          },
        ],
      },
      {
        id: 'eq4',
        name: 'Exit 2',
        type: 'Exit',
        carPark: 'Savill Garden',
        location: 'Secondary exit',
        installedDate: '2021-03-05',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-56789-C',
        lastMaintenance: '2023-03-01',
        status: 'Operational',
        faults: [
          {
            id: 'F32137',
            date: '2023-04-08',
            description: 'Card reader not accepting payments',
            status: 'Completed',
            reportedBy: 'JD',
          },
        ],
      },
      {
        id: 'eq5',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Cranbourne',
        location: 'Main building',
        installedDate: '2020-08-12',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45680-A',
        lastMaintenance: '2023-02-28',
        status: 'Operational',
        faults: [],
      },
    ],
    'Virginia Water': [
      {
        id: 'eq1',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Main building',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45678-A',
        lastMaintenance: '2023-01-20',
        status: 'Operational',
        faults: [
          {
            id: 'F32145',
            date: '2023-04-12',
            description: 'Display showing error code E45',
            status: 'Outstanding',
            reportedBy: 'JD',
          },
        ],
      },
      {
        id: 'eq2',
        name: 'POF 2',
        type: 'POF',
        carPark: 'Virginia Water',
        location: 'Near exit',
        installedDate: '2020-05-15',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45679-A',
        lastMaintenance: '2023-02-10',
        status: 'Operational',
        faults: [],
      },
      {
        id: 'eq3',
        name: 'Entry 1',
        type: 'Entry',
        carPark: 'Virginia Water',
        location: 'Main entrance',
        installedDate: '2019-11-20',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-34567-B',
        lastMaintenance: '2023-01-15',
        status: 'Needs Attention',
        faults: [],
      },
    ],
    'Cranbourne': [
      {
        id: 'eq5',
        name: 'POF 1',
        type: 'POF',
        carPark: 'Cranbourne',
        location: 'Main building',
        installedDate: '2020-08-12',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-45680-A',
        lastMaintenance: '2023-02-28',
        status: 'Operational',
        faults: [],
      },
    ],
    'Savill Garden': [
      {
        id: 'eq4',
        name: 'Exit 2',
        type: 'Exit',
        carPark: 'Savill Garden',
        location: 'Secondary exit',
        installedDate: '2021-03-05',
        manufacturer: 'Skidata',
        serialNumber: 'SKI-56789-C',
        lastMaintenance: '2023-03-01',
        status: 'Operational',
        faults: [],
      },
    ],
    'Wick': [],
    'Rangers': []
  }
};

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

const revenueLossByAsset = [
  { name: 'Barrier A', revenue: 3200, downtime: 24 },
  { name: 'Ticket Machine B', revenue: 2800, downtime: 18 },
  { name: 'Payment Terminal C', revenue: 4500, downtime: 36 },
  { name: 'Barrier D', revenue: 1900, downtime: 12 },
  { name: 'CCTV System E', revenue: 800, downtime: 8 },
];

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

const statuses = ['All Statuses', 'Outstanding', 'Parts Ordered', 'Completed'];

const equipmentData = [
  {
    id: 'eq1',
    name: 'POF 1',
    type: 'POF',
    carPark: 'Virginia Water',
    location: 'Main building',
    installedDate: '2020-05-15',
    manufacturer: 'Skidata',
    serialNumber: 'SKI-45678-A',
    lastMaintenance: '2023-01-20',
    status: 'Operational',
    faults: [
      {
        id: 'F32145',
        date: '2023-04-12',
        description: 'Display showing error code E45',
        status: 'Outstanding',
        reportedBy: 'JD',
      },
      {
        id: 'F31990',
        date: '2023-03-05',
        description: 'Card reader intermittently not accepting payments',
        status: 'Completed',
        reportedBy: 'KA',
      },
    ],
  },
  {
    id: 'eq2',
    name: 'POF 2',
    type: 'POF',
    carPark: 'Virginia Water',
    location: 'Near exit',
    installedDate: '2020-05-15',
    manufacturer: 'Skidata',
    serialNumber: 'SKI-45679-A',
    lastMaintenance: '2023-02-10',
    status: 'Operational',
    faults: [
      {
        id: 'F32100',
        date: '2023-03-25',
        description: 'Coin acceptor jammed',
        status: 'Completed',
        reportedBy: 'JD',
      },
    ],
  },
  {
    id: 'eq3',
    name: 'Entry 1',
    type: 'Entry',
    carPark: 'Virginia Water',
    location: 'Main entrance',
    installedDate: '2019-11-20',
    manufacturer: 'Skidata',
    serialNumber: 'SKI-34567-B',
    lastMaintenance: '2023-01-15',
    status: 'Needs Attention',
    faults: [
      {
        id: 'F32142',
        date: '2023-04-11',
        description: 'Barrier not raising fully',
        status: 'Parts Ordered',
        reportedBy: 'KA',
      },
    ],
  },
  {
    id: 'eq4',
    name: 'Exit 2',
    type: 'Exit',
    carPark: 'Savill Garden',
    location: 'Secondary exit',
    installedDate: '2021-03-05',
    manufacturer: 'Skidata',
    serialNumber: 'SKI-56789-C',
    lastMaintenance: '2023-03-01',
    status: 'Operational',
    faults: [
      {
        id: 'F32137',
        date: '2023-04-08',
        description: 'Card reader not accepting payments',
        status: 'Completed',
        reportedBy: 'JD',
      },
    ],
  },
  {
    id: 'eq5',
    name: 'POF 1',
    type: 'POF',
    carPark: 'Cranbourne',
    location: 'Main building',
    installedDate: '2020-08-12',
    manufacturer: 'Skidata',
    serialNumber: 'SKI-45680-A',
    lastMaintenance: '2023-02-28',
    status: 'Operational',
    faults: [],
  },
];

const UnifiedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSection, setActiveSection] = useState('faults');
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);
  const [selectedFault, setSelectedFault] = useState<any | null>(null);
  const [isFaultDialogOpen, setIsFaultDialogOpen] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('year');
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
// Filter function for recent faults
  const filteredFaults = mockData.recentFaults.filter(fault => {
    const matchesCarPark = !selectedCarPark || selectedCarPark === 'All Car Parks' || fault.carPark === selectedCarPark;
    const matchesStatus = !selectedStatus || selectedStatus === 'All Statuses' || fault.status === selectedStatus;
    const matchesSearch = !searchQuery || 
      fault.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fault.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fault.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCarPark && matchesStatus && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCarPark(null);
    setSelectedStatus(null);
    setSearchQuery('');
  };

  const currentStats = mockData.carParkData[activeTab as keyof typeof mockData.carParkData];
  
  // const filteredFaults = useMemo(() => {
  //   if (activeTab === 'Overview') {
  //     return mockData.recentFaults;
  //   }
  //   return mockData.recentFaults.filter(fault => fault.carPark === activeTab);
  // }, [activeTab]);
  
  const currentEquipment = mockData.equipment[activeTab as keyof typeof mockData.equipment];
  console.log('currentEquipment', currentEquipment);
  
  const currentEquipmentList = mockData.equipmentList[activeTab as keyof typeof mockData.equipmentList] || [];
  console.log('currentEquipmentList', currentEquipmentList);
  // Filter equipment based on selected filters and search query
  const filteredEquipment = equipmentData.filter((equipment) => {
    const matchesCarPark = selectedCarPark ? equipment.carPark === selectedCarPark : true;
    const matchesType = selectedType ? equipment.type === selectedType : true;
    const matchesSearch = searchQuery 
      ? equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCarPark && matchesType && matchesSearch;
  });
  
  const currentAnalytics = mockData.analytics[activeTab as keyof typeof mockData.analytics];

  const toggleExpandedEquipment = (id: string) => {
    if (expandedEquipment === id) {
      setExpandedEquipment(null);
    } else {
      setExpandedEquipment(id);
    }
  };

  const handleFaultClick = (fault: any) => {
    setSelectedFault(fault);
    setIsFaultDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {activeTab === 'Overview' 
              ? 'Overview of all car parks' 
              : `Information for ${activeTab} car park`}
          </p>
        </div>
        <Button>
          <AlertCircle className="mr-2 h-4 w-4" />
          Report New Fault
        </Button>
      </div>

      <Tabs defaultValue="Overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-10 mb-4 w-full justify-start">
          {carParks.map((carPark) => (
            <TabsTrigger
              key={carPark}
              value={carPark}
              className="px-4 py-2"
            >
              {carPark}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent key={activeTab} value={activeTab} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
              title="Total Assets"
              value={currentStats.totalAssets}
              icon={<LayoutDashboard className="h-4 w-4 text-primary" />}
              description="All assets"
              className="animate-slide-up"
            />
            <StatCard
              title="Healthy Assets"
              value={currentStats.healthyAssets}
              icon={<CheckCircle className="h-4 w-4 text-success" />}
              description="Operational assets"
              className="animate-slide-up animation-delay-100"
            />
            <StatCard
              title="Faulty Assets"
              value={currentStats.faultyAssets}
              icon={<AlertCircle className="h-4 w-4 text-destructive" />}
              description="Equipment requiring attention"
              className="animate-slide-up animation-delay-200"
            />
            <StatCard
              title="Overdue Maintenance"
              value={currentStats.overdueAssets}
              icon={<Clock className="h-4 w-4 text-warning" />}
              description="Past scheduled maintenance"
              className="animate-slide-up animation-delay-300"
            />
            <StatCard
              title="In Progress"
              value={currentStats.inProgress}
              icon={<BarChartIcon className="h-4 w-4 text-info" />}
              description="Maintenance in progress"
              className="animate-slide-up animation-delay-400"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="faults" onValueChange={setActiveSection} className="w-full">
        <TabsList className="bg-muted mb-6">
          <TabsTrigger value="faults">Fault Reports</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="faults" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {activeTab === 'Overview' 
                  ? 'Fault Reports Overview' 
                  : `Fault Reports for ${activeTab}`}
              </CardTitle>
              <CardDescription>
                {activeTab === 'Overview' 
                  ? 'All reported faults across car parks' 
                  : `Reported faults for ${activeTab} car park`}
              </CardDescription>
            </CardHeader>
            <div className="flex items-center pl-6 pb-2 gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <div className="relative w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-8 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        className="absolute right-2.5 top-2.5" 
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
                <Select value={selectedCarPark || ''} onValueChange={(value) => setSelectedCarPark(value)}>
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="Car Park" />
                  </SelectTrigger>
                  <SelectContent>
                    {carParks.map((carPark) => (
                      <SelectItem key={carPark} value={carPark}>
                        {carPark}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus || ''} onValueChange={(value) => setSelectedStatus(value)}>
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(selectedCarPark || selectedStatus || searchQuery) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b py-3 px-4 bg-muted/50">
                  <div className="col-span-1 font-medium text-sm">ID</div>
                  <div className="col-span-2 font-medium text-sm">Equipment</div>
                  <div className="col-span-3 font-medium text-sm">Fault Description</div>
                  <div className="col-span-2 font-medium text-sm">Carpark</div>
                  <div className="col-span-1 font-medium text-sm">Detection Date</div>
                  <div className="col-span-1 font-medium text-sm">Days Open</div>
                  <div className="col-span-1 font-medium text-sm">Expected Resolution</div>
                  <div className="col-span-1 font-medium text-sm">Status</div>
                </div>
                {filteredFaults.length > 0 ? (
                  filteredFaults.map((fault) => (
                    <div 
                      key={fault.id} 
                      className="grid grid-cols-12 border-b py-3 px-4 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => handleFaultClick(fault)}
                    >
                      <div className="col-span-1 text-sm font-medium text-primary">{fault.id}</div>
                      <div className="col-span-2 text-sm">{fault.equipment}</div>
                      <div className="col-span-3 text-sm truncate">{fault.description}</div>
                      <div className="col-span-2 text-sm">{fault.carPark}</div>
                      <div className="col-span-1 text-sm text-muted-foreground">{fault.date}</div>
                      <div className="col-span-1 text-sm">
                        {fault.daysOpen} {fault.overdueBy && (
                          <span className="text-destructive font-medium">+{fault.overdueBy}</span>
                        )}
                      </div>
                      <div className="col-span-1 text-sm text-muted-foreground">12/05/2023</div>
                      <div className="col-span-1">
                        <StatusBadge status={fault.status as any} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No fault reports found for this car park
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'Overview' 
                  ? 'Equipment Overview' 
                  : `Equipment in ${activeTab}`}
              </CardTitle>
              <CardDescription>
                {activeTab === 'Overview' 
                  ? 'View and manage equipment inventory across all car parks' 
                  : `Equipment inventory for ${activeTab} car park`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentEquipment.map((equipment, index) => (
                  <Card key={`${equipment.type}-${index}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{equipment.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equipment.total}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {equipment.functional} functional
                        {equipment.faulty ? `, ${equipment.faulty} faulty` : ''}
                        {equipment.maintenance ? `, ${equipment.maintenance} in maintenance` : ''}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment List</CardTitle>
              <CardDescription>
                Click on any equipment to view more details
              </CardDescription>
            </CardHeader>
            <div className="relative mx-6 pb-2 flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CardContent>
              <div className="space-y-4">
                {currentEquipmentList.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <Info className="h-10 w-10 text-muted-foreground/50 mb-3" />
                    <p className="text-center text-muted-foreground">No equipment found for this car park.</p>
                  </div>
                ) : (
                  filteredEquipment.map((equipment, index) => (
                    <Card 
                      key={equipment.id} 
                      className={`overflow-hidden animate-scale-in animation-delay-${index * 100}`}
                    >
                      <CardHeader className="pb-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleExpandedEquipment(equipment.id)}
                        >
                          <div className="flex items-center">
                            <div className="mr-3">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Cog className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <div>
                              <CardTitle>{equipment.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {equipment.type} • {equipment.carPark} • {equipment.location}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                equipment.status === 'Operational' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                              }`}>
                                {equipment.status}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              {expandedEquipment === equipment.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {expandedEquipment === equipment.id && (
                        <>
                          <CardContent className="pb-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Manufacturer</p>
                                <p className="font-medium">{equipment.manufacturer}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Serial Number</p>
                                <p className="font-medium">{equipment.serialNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Installed Date</p>
                                <p className="font-medium">{equipment.installedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Last Maintenance</p>
                                <p className="font-medium">{equipment.lastMaintenance}</p>
                              </div>
                            </div>
                            
                            <Separator className="my-4" />
                            
                            <div>
                              <h4 className="font-medium mb-2">Fault History</h4>
                              {equipment.faults.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No fault history for this equipment.</p>
                              ) : (
                                <div className="rounded-md border">
                                  <div className="grid grid-cols-12 border-b py-2 px-3 bg-muted/50">
                                    <div className="col-span-2 font-medium text-xs">Reference</div>
                                    <div className="col-span-2 font-medium text-xs">Date</div>
                                    <div className="col-span-5 font-medium text-xs">Description</div>
                                    <div className="col-span-2 font-medium text-xs">Status</div>
                                    <div className="col-span-1 font-medium text-xs">By</div>
                                  </div>
                                  {equipment.faults.map((fault) => (
                                    <div key={fault.id} className="grid grid-cols-12 border-b py-2 px-3 hover:bg-muted/20 transition-colors">
                                      <div className="col-span-2 text-xs font-medium text-primary">{fault.id}</div>
                                      <div className="col-span-2 text-xs">{fault.date}</div>
                                      <div className="col-span-5 text-xs truncate">{fault.description}</div>
                                      <div className="col-span-2">
                                        <StatusBadge status={fault.status as any} />
                                      </div>
                                      <div className="col-span-1 text-xs">{fault.reportedBy}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3 flex justify-end gap-2">
                            <Button variant="outline" size="sm">Edit Equipment</Button>
                            <Button size="sm">
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Report Fault
                            </Button>
                          </CardFooter>
                        </>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-end gap-2">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
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
              <BarChartIcon className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>

          <Tabs defaultValue="overview" onValueChange={setAnalyticsTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="faults">Fault Reports</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">Total Faults</CardTitle>
                      <CardDescription>Last 12 months</CardDescription>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-primary" />
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
                      <DollarSign className="h-5 w-5 text-red-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">$42,300</div>
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
                    <p className="text-xs text-muted-foreground">$4,500 revenue impact</p>
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
                    <div className="text-2xl font-bold">$125</div>
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
                          <Bar dataKey="revenue" fill="#ea384c" name="Revenue Lost ($)" />
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
                          <Line type="monotone" dataKey="loss" stroke="#ea384c" activeDot={{ r: 8 }} name="Revenue Lost ($)" />
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
                        <Bar yAxisId="left" dataKey="revenue" fill="#ea384c" name="Revenue Lost ($)" />
                        <Bar yAxisId="right" dataKey="downtime" fill="#8884d8" name="Downtime Hours" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      <Dialog open={isFaultDialogOpen} onOpenChange={setIsFaultDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Fault Report {selectedFault?.id}</DialogTitle>
            <DialogDescription>
              Details for the selected fault report
            </DialogDescription>
          </DialogHeader>
          {selectedFault && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Status:</div>
                <StatusBadge status={selectedFault.status as any} />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Car Park</p>
                  <p className="font-medium">{selectedFault.carPark}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equipment</p>
                  <p className="font-medium">{selectedFault.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported Date</p>
                  <p className="font-medium">{selectedFault.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported By</p>
                  <p className="font-medium">{selectedFault.reportedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Open</p>
                  <p className="font-medium">
                    {selectedFault.daysOpen} {selectedFault.overdueBy && (
                      <span className="text-destructive font-medium">+{selectedFault.overdueBy} overdue</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Resolution</p>
                  <p className="font-medium">12/05/2023</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p>{selectedFault.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Actions Taken</p>
                <p className="text-muted-foreground italic">
                  {selectedFault.status === 'Completed' 
                    ? 'Issue resolved by replacing the faulty hardware component.' 
                    : selectedFault.status === 'In Progress'
                    ? 'Technician assigned and diagnostic tests in progress.'
                    : 'No actions taken yet.'}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsFaultDialogOpen(false)}>Close</Button>
            <Button>
              <AlertCircle className="mr-2 h-4 w-4" />
              Update Status
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnifiedDashboard;
