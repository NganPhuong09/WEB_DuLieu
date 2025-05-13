import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart2, PieChart, LineChart, Users, BookOpen } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  Scatter,
  ScatterChart
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

// Dữ liệu mẫu cho biểu đồ
const genderData = [
  { name: 'Nam', value: 62 },
  { name: 'Nữ', value: 38 }
];

const ageDistributionData = [
  { age: '18-20', count: 350 },
  { age: '21-23', count: 820 },
  { age: '24-26', count: 520 },
  { age: '27-30', count: 210 },
  { age: '31+', count: 90 }
];

const topSchoolsData = [
  { name: 'Đại học Quốc gia Hà Nội', students: 450 },
  { name: 'Đại học Bách khoa Hà Nội', students: 420 },
  { name: 'Đại học Quốc gia TP.HCM', students: 380 },
  { name: 'Đại học FPT', students: 320 },
  { name: 'Đại học Ngoại thương', students: 290 },
];

const fieldOfStudyData = [
  { field: 'Công nghệ thông tin', count: 580 },
  { field: 'Kinh tế', count: 450 },
  { field: 'Kỹ thuật', count: 380 },
  { field: 'Khoa học dữ liệu', count: 280 },
  { field: 'Truyền thông', count: 220 },
  { field: 'Khác', count: 180 }
];

const learningBehaviorData = [
  { name: 'Tốc độ trung bình', min: 0.8, q1: 0.9, median: 1, q3: 1.2, max: 1.5 },
  { name: 'Thời gian xem thực tế', min: 10, q1: 20, median: 35, q3: 50, max: 75 },
  { name: 'Thời gian tua lại', min: 0, q1: 5, median: 12, q3: 22, max: 40 },
  { name: 'Thời gian tạm dừng', min: 2, q1: 8, median: 15, q3: 25, max: 45 }
];

const assignmentData = [
  { type: 'Quiz', avgAttempts: 1.8, avgScore: 78, correctRate: 72 },
  { type: 'Coding', avgAttempts: 3.2, avgScore: 68, correctRate: 58 },
  { type: 'MCQ', avgAttempts: 1.2, avgScore: 82, correctRate: 80 },
  { type: 'Essay', avgAttempts: 1.5, avgScore: 75, correctRate: 70 },
];

const commentActivityData = [
  { week: 'Tuần 1', comments: 245 },
  { week: 'Tuần 2', comments: 320 },
  { week: 'Tuần 3', comments: 280 },
  { week: 'Tuần 4', comments: 450 },
  { week: 'Tuần 5', comments: 380 },
  { week: 'Tuần 6', comments: 410 },
  { week: 'Tuần 7', comments: 320 },
  { week: 'Tuần 8', comments: 290 }
];

// Dữ liệu cho phần khóa học
const courseEnrollmentData = [
  { name: 'Machine Learning Cơ bản', students: 850 },
  { name: 'Lập trình Python', students: 720 },
  { name: 'Data Science và Phân tích', students: 680 },
  { name: 'Deep Learning', students: 520 },
  { name: 'Xử lý ngôn ngữ tự nhiên', students: 410 }
];

const videoDurationData = [
  { duration: '5-10', count: 45 },
  { duration: '10-15', count: 78 },
  { duration: '15-20', count: 52 },
  { duration: '20-25', count: 27 },
  { duration: '25+', count: 18 }
];

const videoEngagementData = [
  { id: 'Video 1', engagement: 92, duration: 12 },
  { id: 'Video 2', engagement: 85, duration: 18 },
  { id: 'Video 3', engagement: 78, duration: 22 },
  { id: 'Video 4', engagement: 95, duration: 8 },
  { id: 'Video 5', engagement: 88, duration: 15 },
  { id: 'Video 6', engagement: 80, duration: 20 },
  { id: 'Video 7', engagement: 75, duration: 25 },
  { id: 'Video 8', engagement: 90, duration: 10 }
];

const exerciseCompletionData = [
  { course: 'Machine Learning Cơ bản', correct: 75, incorrect: 25 },
  { course: 'Lập trình Python', correct: 82, incorrect: 18 },
  { course: 'Data Science và Phân tích', correct: 68, incorrect: 32 },
  { course: 'Deep Learning', correct: 72, incorrect: 28 },
  { course: 'Xử lý ngôn ngữ tự nhiên', correct: 70, incorrect: 30 }
];

const scoreOverTimeData = [
  { date: '1/4', score: 78 },
  { date: '8/4', score: 82 },
  { date: '15/4', score: 79 },
  { date: '22/4', score: 84 },
  { date: '29/4', score: 86 },
  { date: '6/5', score: 89 },
  { date: '13/5', score: 85 }
];

// Màu sắc cho biểu đồ
const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
const GENDER_COLORS = ['#8884d8', '#FF8042'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Giả lập tải dữ liệu
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Trực quan hóa dữ liệu và kết quả dự đoán</p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5 gap-2">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="students">Học viên</TabsTrigger>
                <TabsTrigger value="courses">Khóa học</TabsTrigger>
                <TabsTrigger value="model">Mô hình</TabsTrigger>
                <TabsTrigger value="predictions">Dự đoán</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Tổng học viên</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">2,845</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +12.5% so với kỳ trước
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Khóa học</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">128</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +5.2% so với kỳ trước
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Tỉ lệ hài lòng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">85.4%</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +3.7% so với kỳ trước
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Độ chính xác mô hình</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">92.3%</div>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="i-lucide-trending-up mr-1"></span>
                        +1.4% so với kỳ trước
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Main Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AreaChart className="h-5 w-5 text-research-primary" />
                      <span>Phân bố mức độ hài lòng theo thời gian</span>
                    </CardTitle>
                    <CardDescription>
                      Phân tích xu hướng độ hài lòng của học viên theo các giai đoạn khóa học
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                      <div className="text-gray-500 text-center">
                        <p>Biểu đồ sẽ được hiển thị tại đây</p>
                        <p className="text-sm text-gray-400">Dữ liệu sẽ được cập nhật sau</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Two Column Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Phân bố Video Engagement Index</CardTitle>
                      <CardDescription>
                        Mức độ tương tác của học viên với video bài giảng
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
                        <div className="text-gray-500 text-center">
                          <p>Biểu đồ VEI sẽ được hiển thị tại đây</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Phân bố Exercise Engagement Index</CardTitle>
                      <CardDescription>
                        Mức độ tương tác của học viên với bài tập
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
                        <div className="text-gray-500 text-center">
                          <p>Biểu đồ EEI sẽ được hiển thị tại đây</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="students" className="space-y-6">
                {/* Thông tin cá nhân & nền tảng học tập */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Phân bố giới tính (Pie chart) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-research-primary" />
                        <span>Phân bố giới tính</span>
                      </CardTitle>
                      <CardDescription>
                        Tỉ lệ nam/nữ trong tổng số học viên
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex items-center justify-center">
                            <Skeleton className="h-[250px] w-[250px] rounded-full" />
                          </div>
                        ) : (
                          <ChartContainer
                            config={{
                              male: { label: "Nam" },
                              female: { label: "Nữ" }
                            }}
                          >
                            <RechartPieChart>
                              <Pie
                                data={genderData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {genderData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <ChartLegend content={<ChartLegendContent />} />
                            </RechartPieChart>
                          </ChartContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phân bố độ tuổi (Bar chart) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-research-primary" />
                        <span>Phân bố độ tuổi</span>
                      </CardTitle>
                      <CardDescription>
                        Phân bố học viên theo nhóm tuổi
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex flex-col gap-2 justify-center">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-5/6" />
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-8 w-1/4" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageDistributionData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="age" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" name="Số lượng học viên" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Trường học & Ngành học */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top trường học (Bar chart) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-research-primary" />
                        <span>Top trường học</span>
                      </CardTitle>
                      <CardDescription>
                        Các trường có nhiều học viên nhất
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex flex-col gap-2 justify-center">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-4/5" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-8 w-1/2" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={topSchoolsData}
                              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" width={80} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="students" name="Số học viên" fill="#82ca9d" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ngành học (Bar chart) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-research-primary" />
                        <span>Ngành học</span>
                      </CardTitle>
                      <CardDescription>
                        Phân bố học viên theo ngành học
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex flex-col gap-2 justify-center">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-4/5" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-8 w-1/2" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={fieldOfStudyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="field" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" name="Số lượng học viên" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Hành vi học tập */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-research-primary" />
                      <span>Hành vi học tập</span>
                    </CardTitle>
                    <CardDescription>
                      Phân tích các chỉ số học tập (tốc độ xem, thời gian tương tác)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {loading ? (
                        <div className="h-full w-full flex justify-center items-center">
                          <Skeleton className="h-[250px] w-full" />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={learningBehaviorData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="min" name="Min" stackId="a" fill="#8884d8" />
                            <Bar dataKey="q1" name="Q1" stackId="a" fill="#83a6ed" />
                            <Bar dataKey="median" name="Trung vị" stackId="a" fill="#8dd1e1" />
                            <Bar dataKey="q3" name="Q3" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="max" name="Max" stackId="a" fill="#a4de6c" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Hành vi làm bài tập và Tương tác xã hội */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Hành vi làm bài tập */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-research-primary" />
                        <span>Hành vi làm bài tập</span>
                      </CardTitle>
                      <CardDescription>
                        Phân tích số lần thử, điểm số và tỉ lệ đúng
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex flex-col gap-2 justify-center">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-4/5" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-2/3" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={assignmentData}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="type" />
                              <YAxis yAxisId="left" orientation="left" />
                              <YAxis 
                                yAxisId="right" 
                                orientation="right" 
                                domain={[0, 100]} 
                                unit="%" 
                              />
                              <Tooltip />
                              <Legend />
                              <Bar yAxisId="left" dataKey="avgAttempts" name="Số lần thử TB" fill="#8884d8" />
                              <Bar yAxisId="left" dataKey="avgScore" name="Điểm TB" fill="#82ca9d" />
                              <Bar yAxisId="right" dataKey="correctRate" name="Tỉ lệ đúng" fill="#ffc658" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tương tác xã hội */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-research-primary" />
                        <span>Tương tác xã hội</span>
                      </CardTitle>
                      <CardDescription>
                        Số lượng bình luận theo thời gian
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex justify-center items-center">
                            <Skeleton className="h-[250px] w-full" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart
                              data={commentActivityData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="week" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="comments"
                                name="Số bình luận"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-6">
                {/* Thông tin khóa học */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-research-primary" />
                      <span>Phân bố học viên theo khóa học</span>
                    </CardTitle>
                    <CardDescription>
                      Số lượng học viên đăng ký theo từng khóa học
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {loading ? (
                        <div className="h-full w-full flex flex-col gap-2 justify-center">
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-8 w-4/5" />
                          <Skeleton className="h-8 w-3/4" />
                          <Skeleton className="h-8 w-2/3" />
                          <Skeleton className="h-8 w-1/2" />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={courseEnrollmentData}
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis 
                              dataKey="name" 
                              type="category" 
                              width={100} 
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip />
                            <Bar dataKey="students" name="Số học viên" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Video học - Histogram độ dài video & Scatter plot engagement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Histogram độ dài video */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-research-primary" />
                        <span>Độ dài video</span>
                      </CardTitle>
                      <CardDescription>
                        Phân bố độ dài video (phút)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex flex-col gap-2 justify-center">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-8 w-1/4" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={videoDurationData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="duration" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" name="Số lượng video" fill="#82ca9d" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scatter plot video engagement */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-research-primary" />
                        <span>Tương tác video</span>
                      </CardTitle>
                      <CardDescription>
                        Mức độ tương tác theo độ dài video
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex justify-center items-center">
                            <Skeleton className="h-[250px] w-[250px]" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart
                              margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                              }}
                            >
                              <CartesianGrid />
                              <XAxis 
                                type="number" 
                                dataKey="duration" 
                                name="Độ dài (phút)" 
                                unit="phút"
                              />
                              <YAxis 
                                type="number" 
                                dataKey="engagement" 
                                name="Mức độ tương tác" 
                                unit="%"
                              />
                              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                              <Scatter name="Video" data={videoEngagementData} fill="#8884d8" />
                            </ScatterChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bài tập theo khóa học - Stacked bar & Line plot */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Stacked bar chart hoàn thành bài tập */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-research-primary" />
                        <span>Hoàn thành bài tập theo khóa</span>
                      </CardTitle>
                      <CardDescription>
                        Tỉ lệ hoàn thành bài tập đúng theo khóa học
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex flex-col gap-2 justify-center">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-4/5" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-8 w-1/2" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={exerciseCompletionData}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="course" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="correct" name="Đúng" stackId="a" fill="#82ca9d" />
                              <Bar dataKey="incorrect" name="Sai" stackId="a" fill="#ff8042" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Line plot điểm số theo thời gian */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-research-primary" />
                        <span>Điểm số theo thời gian</span>
                      </CardTitle>
                      <CardDescription>
                        Tiến độ điểm số trung bình theo thời gian
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="h-full w-full flex justify-center items-center">
                            <Skeleton className="h-[250px] w-full" />
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart
                              data={scoreOverTimeData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[50, 100]} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="score"
                                name="Điểm trung bình"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="model">
                <Card>
                  <CardHeader>
                    <CardTitle>Mô hình BSI</CardTitle>
                    <CardDescription>
                      Phân tích hiệu suất và độ chính xác của mô hình dự đoán
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 flex items-center justify-center">
                      <p className="text-gray-500">Thông tin về mô hình sẽ được hiển thị tại đây</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="predictions">
                <Card>
                  <CardHeader>
                    <CardTitle>Kết quả dự đoán</CardTitle>
                    <CardDescription>
                      Phân tích kết quả dự đoán độ hài lòng của học viên
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 flex items-center justify-center">
                      <p className="text-gray-500">Kết quả dự đoán sẽ được hiển thị tại đây</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
