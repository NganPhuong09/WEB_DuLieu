
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, AlertCircle, Search, UserCircle } from 'lucide-react';

// Mock data for at-risk students
const atRiskStudentsData = [
  { id: 'SV001', name: 'Nguyễn Văn A', class: 'K20-IT', bsi: 4.2, vei: 3.8, eei: 4.5, csi: 4.6, risk: 'high' },
  { id: 'SV002', name: 'Trần Thị B', class: 'K19-CS', bsi: 4.5, vei: 4.1, eei: 3.6, csi: 5.8, risk: 'high' },
  { id: 'SV003', name: 'Lê Văn C', class: 'K21-EE', bsi: 4.7, vei: 4.8, eei: 4.9, csi: 4.2, risk: 'high' },
  { id: 'SV004', name: 'Phạm Thị D', class: 'K20-ME', bsi: 4.8, vei: 5.2, eei: 3.5, csi: 5.6, risk: 'medium' },
  { id: 'SV005', name: 'Hoàng Văn E', class: 'K18-IT', bsi: 4.9, vei: 3.7, eei: 5.7, csi: 5.1, risk: 'medium' },
  { id: 'SV006', name: 'Võ Thị F', class: 'K22-CS', bsi: 5.0, vei: 5.1, eei: 3.8, csi: 6.2, risk: 'medium' },
  { id: 'SV007', name: 'Đỗ Văn G', class: 'K19-EE', bsi: 5.1, vei: 4.7, eei: 5.0, csi: 5.5, risk: 'medium' },
  { id: 'SV008', name: 'Ngô Thị H', class: 'K21-IT', bsi: 5.2, vei: 5.3, eei: 4.7, csi: 5.8, risk: 'low' },
  { id: 'SV009', name: 'Trịnh Văn I', class: 'K20-CS', bsi: 5.3, vei: 4.9, eei: 5.2, csi: 5.7, risk: 'low' },
  { id: 'SV010', name: 'Lý Thị K', class: 'K22-ME', bsi: 5.4, vei: 5.0, eei: 5.1, csi: 6.0, risk: 'low' },
];

const StudentTracking = () => {
  const [riskFilter, setRiskFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on selected filters and search term
  const filteredStudents = atRiskStudentsData
    .filter(student => (
      (riskFilter === 'all' || student.risk === riskFilter) &&
      (classFilter === 'all' || student.class.includes(classFilter)) &&
      (searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase()))
    ));

  // Handle CSV export
  const exportCSV = () => {
    // Create CSV header
    let csv = 'ID,Tên,Lớp,BSI,VEI,EEI,CSI,Mức độ rủi ro\n';
    
    // Add data rows
    filteredStudents.forEach(student => {
      const row = [
        student.id,
        student.name,
        student.class,
        student.bsi,
        student.vei,
        student.eei,
        student.csi,
        student.risk === 'high' ? 'Cao' : student.risk === 'medium' ? 'Trung bình' : 'Thấp'
      ].join(',');
      csv += row + '\n';
    });
    
    // Create and download the file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sinh_vien_can_ho_tro.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get count of students by risk level
  const highRiskCount = atRiskStudentsData.filter(s => s.risk === 'high').length;
  const mediumRiskCount = atRiskStudentsData.filter(s => s.risk === 'medium').length;
  const lowRiskCount = atRiskStudentsData.filter(s => s.risk === 'low').length;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Theo dõi sinh viên</h2>
        
        {/* Alert about at-risk students */}
        <Alert className="mb-6 border-red-400 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600">Cảnh báo sinh viên cần hỗ trợ</AlertTitle>
          <AlertDescription>
            Hiện có {highRiskCount} sinh viên có BSI rất thấp ({"<"} 4.5) và {mediumRiskCount} sinh viên có BSI thấp ({"<"} 5.5) cần được hỗ trợ kịp thời.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc mức độ rủi ro</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mức độ rủi ro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="high">Rủi ro cao</SelectItem>
                  <SelectItem value="medium">Rủi ro trung bình</SelectItem>
                  <SelectItem value="low">Rủi ro thấp</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc lớp</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="K18">K18</SelectItem>
                  <SelectItem value="K19">K19</SelectItem>
                  <SelectItem value="K20">K20</SelectItem>
                  <SelectItem value="K21">K21</SelectItem>
                  <SelectItem value="K22">K22</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="CS">CS</SelectItem>
                  <SelectItem value="EE">EE</SelectItem>
                  <SelectItem value="ME">ME</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Tìm kiếm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên hoặc ID"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Student tracking table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-research-primary" />
              <span>Danh sách sinh viên cần hỗ trợ</span>
            </span>
            <Button onClick={exportCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Xuất CSV
            </Button>
          </CardTitle>
          <CardDescription>
            Danh sách sinh viên có chỉ số BSI thấp cần được hỗ trợ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên sinh viên</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead className="text-center">BSI</TableHead>
                  <TableHead className="text-center">VEI</TableHead>
                  <TableHead className="text-center">EEI</TableHead>
                  <TableHead className="text-center">CSI</TableHead>
                  <TableHead className="text-center">Mức độ rủi ro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell 
                        className="text-center"
                        style={{
                          color: student.bsi < 4.5 ? '#dc2626' : student.bsi < 5.5 ? '#ea580c' : '#65a30d',
                          fontWeight: 600
                        }}
                      >
                        {student.bsi.toFixed(1)}
                      </TableCell>
                      <TableCell 
                        className="text-center"
                        style={{
                          color: student.vei < 4.5 ? '#dc2626' : student.vei < 5.5 ? '#ea580c' : '#65a30d'
                        }}
                      >
                        {student.vei.toFixed(1)}
                      </TableCell>
                      <TableCell 
                        className="text-center"
                        style={{
                          color: student.eei < 4.5 ? '#dc2626' : student.eei < 5.5 ? '#ea580c' : '#65a30d'
                        }}
                      >
                        {student.eei.toFixed(1)}
                      </TableCell>
                      <TableCell 
                        className="text-center"
                        style={{
                          color: student.csi < 4.5 ? '#dc2626' : student.csi < 5.5 ? '#ea580c' : '#65a30d'
                        }}
                      >
                        {student.csi.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          student.risk === 'high' ? 'bg-red-100 text-red-800' : 
                          student.risk === 'medium' ? 'bg-orange-100 text-orange-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {student.risk === 'high' ? 'Cao' : student.risk === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                      Không tìm thấy sinh viên nào phù hợp với điều kiện lọc
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentTracking;
