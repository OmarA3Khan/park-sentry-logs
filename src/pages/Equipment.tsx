import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cog, 
  Search, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Filter, 
  Plus, 
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/StatusBadge';

// Mock data for equipment
const carParks = [
  'Virginia Water',
  'Virginia Water South',
  'Savill Garden',
  'Wick',
  'Rangers',
  'Cranbourne',
];

const equipmentTypes = ['POF', 'Entry', 'Exit'];

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

const Equipment: React.FC = () => {
  const [selectedCarPark, setSelectedCarPark] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
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
  
  const toggleExpandedEquipment = (id: string) => {
    if (expandedEquipment === id) {
      setExpandedEquipment(null);
    } else {
      setExpandedEquipment(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Equipment Management</h1>
          <p className="text-muted-foreground">Manage all equipment across car parks</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
              <DialogDescription>
                Enter the details for the new equipment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="e.g. POF 3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="carPark">Car Park</Label>
                <Select>
                  <SelectTrigger id="carPark">
                    <SelectValue placeholder="Select car park" />
                  </SelectTrigger>
                  <SelectContent>
                    {carParks.map((carPark) => (
                      <SelectItem key={carPark} value={carPark}>
                        {carPark}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. Main building" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input id="manufacturer" placeholder="e.g. Skidata" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input id="serialNumber" placeholder="e.g. SKI-12345-X" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="installedDate">Installation Date</Label>
                <Input id="installedDate" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Equipment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCarPark || ''} onValueChange={(value) => setSelectedCarPark(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Car Park" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-car-parks">All Car Parks</SelectItem>
              {carParks.map((carPark) => (
                <SelectItem key={carPark} value={carPark}>
                  {carPark}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType || ''} onValueChange={(value) => setSelectedType(value || null)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              {equipmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredEquipment.length === 0 ? (
          <Card>
            <CardContent className="py-8 flex flex-col items-center justify-center">
              <Info className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-center text-muted-foreground">No equipment found matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSelectedCarPark(null);
                  setSelectedType(null);
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
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
                    <div className='mt-4'>
                      <Label className="text-muted-foreground">AI Suggestions</Label>
                      <ul className='mt-2'>
                        <li className="font-medium text-sm">- This equipment is approaching 5 years since installation (2020-04-15) - 82% of similar Santa Martín® units require component replacement after 5-6 years</li>
                        <li className="font-medium text-sm">- Based on maintenance history, this display is overdue for preventive service (last maintained 2020-04-20)</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Edit Equipment</Button>
                    <Button size="sm">
                      <AlertCircle className="mr-2 h-3.5 w-3.5" />
                      Report Fault
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Equipment;
