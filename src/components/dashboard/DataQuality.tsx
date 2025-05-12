
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart, Database, CheckCircle, AlertTriangle, Clock, LineChart } from "lucide-react";

// Mock data for data quality metrics
const completenessData = [
  { field: 'user_id', complete: 100, missing: 0 },
  { field: 'video_id', complete: 98.2, missing: 1.8 },
  { field: 'course_id', complete: 100, missing: 0 },
  { field: 'comment_id', complete: 85.7, missing: 14.3 },
  { field: 'name', complete: 99.8, missing: 0.2 },
  { field: 'gender', complete: 97.5, missing: 2.5 },
  { field: 'school', complete: 94.3, missing: 5.7 },
  { field: 'year_of_birth', complete: 92.1, missing: 7.9 },
  { field: 'enroll_time', complete: 99.5, missing: 0.5 },
  { field: 'field', complete: 90.8, missing: 9.2 },
];

// Mock data for consistency issues
const consistencyData = [
  { issue: 'Dữ liệu trùng lặp', count: 42 },
  { issue: 'Sai định dạng ngày', count: 68 },
  { issue: 'Điểm không hợp lệ', count: 23 },
  { issue: 'Giá trị ngoài phạm vi', count: 35 },
  { issue: 'Dữ liệu không nhất quán', count: 57 },
];

// Mock data for timeliness
const timelinessData = {
  upToDate: 94.2,
  delayed: 5.8,
  avgDelay: '2.3 ngày'
};

// Mock data for model accuracy
const modelAccuracyData = {
  overall: 86.5,
  precision: 89.3,
  recall: 84.2,
  f1Score: 86.7,
  confusionMatrix: [
    { name: 'Dự đoán Đúng (TP)', value: 412 },
    { name: 'Dự đoán Sai (FP)', value: 49 },
    { name: 'Bỏ sót (FN)', value: 77 },
    { name: 'Đúng Âm (TN)', value: 395 },
  ]
};

const DataQuality = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Đánh giá chất lượng dữ liệu</h2>
        <p className="text-gray-600 mb-4">
          Phân tích mức độ tin cậy và chất lượng của dữ liệu sử dụng trong mô hình dự đoán BSI
        </p>
        
        {/* Data Quality Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Database className="h-4 w-4 text-research-primary" />
                Tính đầy đủ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">95.8%</div>
              <Progress value={95.8} className="h-2 mt-2" />
              <p className="text-xs text-gray-600 mt-1">
                Tỷ lệ dữ liệu không bị thiếu
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-research-primary" />
                Tính nhất quán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">97.8%</div>
              <Progress value={97.8} className="h-2 mt-2" />
              <p className="text-xs text-gray-600 mt-1">
                Tỷ lệ dữ liệu không có lỗi định dạng
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Clock className="h-4 w-4 text-research-primary" />
                Tính kịp thời
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">94.2%</div>
              <Progress value={94.2} className="h-2 mt-2" />
              <p className="text-xs text-gray-600 mt-1">
                Tỷ lệ dữ liệu được cập nhật kịp thời
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-research-primary" />
                Độ chính xác mô hình
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">86.5%</div>
              <Progress value={86.5} className="h-2 mt-2" />
              <p className="text-xs text-gray-600 mt-1">
                Tỷ lệ dự đoán chính xác
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Hard Dimensions Section */}
      <h3 className="text-xl font-bold mb-4">Hard Dimensions</h3>
      
      {/* Completeness */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-research-primary" />
            <span>Completeness: Tỉ lệ ô trống, thiếu dữ liệu</span>
          </CardTitle>
          <CardDescription>
            Phân tích tỷ lệ dữ liệu đầy đủ và thiếu theo từng trường
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              complete: { color: '#4ade80' },
              missing: { color: '#f87171' },
            }}
            className="h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={completenessData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 150,
                  bottom: 5,
                }}
                barGap={0}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <YAxis type="category" dataKey="field" />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name === "complete" ? "Đầy đủ" : "Thiếu"]}
                  labelFormatter={(label) => `Trường dữ liệu: ${label}`}
                />
                <Legend payload={[
                  { value: 'Đầy đủ', type: 'rect', color: '#4ade80' },
                  { value: 'Thiếu', type: 'rect', color: '#f87171' },
                ]} />
                <Bar dataKey="complete" name="Đầy đủ" stackId="a" fill="var(--color-complete)" />
                <Bar dataKey="missing" name="Thiếu" stackId="a" fill="var(--color-missing)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Consistency */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-research-primary" />
            <span>Consistency: Dữ liệu trùng lặp, sai định dạng</span>
          </CardTitle>
          <CardDescription>
            Phân tích các vấn đề về tính nhất quán của dữ liệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              issues: { color: '#f97316' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={consistencyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="issue" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value} trường hợp`, "Số lượng"]}
                  labelFormatter={(label) => `Vấn đề: ${label}`}
                />
                <Legend />
                <Bar dataKey="count" name="Số lượng" fill="var(--color-issues)">
                  {consistencyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(${24 + index * 10}, 90%, ${65 - index * 3}%)`} 
                    />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Timeliness */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-research-primary" />
            <span>Timeliness: Dữ liệu cập nhật kịp thời hay không</span>
          </CardTitle>
          <CardDescription>
            Đánh giá mức độ cập nhật kịp thời của dữ liệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Tỷ lệ dữ liệu cập nhật</h4>
              <div className="relative pt-1">
                <div className="mb-6">
                  <div className="text-xs text-gray-600 mb-1">Cập nhật kịp thời ({timelinessData.upToDate}%)</div>
                  <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${timelinessData.upToDate}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    >
                      {timelinessData.upToDate}%
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Cập nhật trễ ({timelinessData.delayed}%)</div>
                  <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${timelinessData.delayed}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                    >
                      {timelinessData.delayed}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-md">
              <h4 className="text-sm font-medium mb-2">Thông tin chi tiết</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Thời gian trễ trung bình:</p>
                  <p className="text-xl font-bold">{timelinessData.avgDelay}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tỷ lệ dữ liệu được cập nhật trong 24 giờ:</p>
                  <p className="text-xl font-bold">87.5%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tỷ lệ dữ liệu được cập nhật trong 7 ngày:</p>
                  <p className="text-xl font-bold">94.2%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soft Dimensions */}
      <h3 className="text-xl font-bold mb-4">Soft Dimension (Gián tiếp)</h3>
      
      {/* Accuracy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-research-primary" />
            <span>Accuracy: Đánh giá qua hiệu suất mô hình</span>
          </CardTitle>
          <CardDescription>
            Đánh giá độ chính xác của mô hình dự đoán BSI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Độ chính xác tổng thể:</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${modelAccuracyData.overall}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      >
                        {modelAccuracyData.overall}%
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Precision:</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${modelAccuracyData.precision}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      >
                        {modelAccuracyData.precision}%
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Recall:</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${modelAccuracyData.recall}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                      >
                        {modelAccuracyData.recall}%
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">F1-Score:</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${modelAccuracyData.f1Score}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-violet-500"
                      >
                        {modelAccuracyData.f1Score}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-md">
              <h4 className="text-sm font-medium mb-4">Ma trận nhầm lẫn (Confusion Matrix)</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-100 p-4 rounded text-center">
                  <p className="text-sm text-gray-800">Dự đoán Đúng (TP)</p>
                  <p className="text-2xl font-bold text-green-700">{modelAccuracyData.confusionMatrix[0].value}</p>
                </div>
                <div className="bg-red-100 p-4 rounded text-center">
                  <p className="text-sm text-gray-800">Dự đoán Sai (FP)</p>
                  <p className="text-2xl font-bold text-red-700">{modelAccuracyData.confusionMatrix[1].value}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded text-center">
                  <p className="text-sm text-gray-800">Bỏ sót (FN)</p>
                  <p className="text-2xl font-bold text-yellow-700">{modelAccuracyData.confusionMatrix[2].value}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded text-center">
                  <p className="text-sm text-gray-800">Đúng Âm (TN)</p>
                  <p className="text-2xl font-bold text-blue-700">{modelAccuracyData.confusionMatrix[3].value}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Hiệu suất mô hình cho thấy mức độ chính xác chung là tương đối tốt (86.5%), tuy nhiên vẫn còn khả năng cải thiện. 
                  Cần đặc biệt lưu ý đến các trường hợp bỏ sót (FN) với 77 trường hợp chưa được phát hiện.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DataQuality;
