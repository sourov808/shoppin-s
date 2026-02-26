import { adminAnalytics } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Download, LayoutDashboard, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Detailed performance metrics and growth indicators.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Core Metrics Summary */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary/80 font-medium">Net Income</CardDescription>
            <CardTitle className="text-4xl font-extrabold text-primary">
              ${(adminAnalytics.totalRevenue * 0.75).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-emerald-600 mt-2">
              ↑ 18.2% vs last period
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary/80 font-medium">Avg. Order Value</CardDescription>
            <CardTitle className="text-4xl font-extrabold text-primary">
              ${(adminAnalytics.totalRevenue / adminAnalytics.totalOrders).toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-emerald-600 mt-2">
              ↑ 4.1% vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted text-muted-foreground border-dashed">
          <CardHeader className="pb-2">
            <CardDescription>Customer Acquisition Cost</CardDescription>
            <CardTitle className="text-4xl font-bold text-foreground">
              $42.50
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-destructive mt-2">
              ↓ 1.2% vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted text-muted-foreground border-dashed">
          <CardHeader className="pb-2">
            <CardDescription>Refund Rate</CardDescription>
            <CardTitle className="text-4xl font-bold text-foreground">
              1.8%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-emerald-600 mt-2">
              ↓ 0.4% vs last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Area */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Revenue Breakdown Placeholder */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-5 h-[400px]">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>
              Comparing Electronics, Apparel, and Home Goods categories over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center pt-8 border-t bg-muted/10 mx-6 mb-6 rounded-b">
             <div className="text-center text-muted-foreground flex flex-col items-center">
                <LayoutDashboard className="h-10 w-10 mb-4 opacity-50" />
                <p>Advanced Chart Visualization Plugin Required</p>
                <p className="text-xs mt-2 max-w-[250px]">
                  Integrate tools like Recharts or Chart.js for deep dive analytics.
                </p>
             </div>
          </CardContent>
        </Card>

        {/* Top Demographics */}
        <Card className="col-span-1 lg:col-span-2 overflow-hidden flex flex-col group">
             <CardHeader className="border-b bg-muted/40">
                  <CardTitle className="text-lg">Top Sales Regions</CardTitle>
             </CardHeader>
             <CardContent className="p-0 flex-1 flex flex-col justify-between">
                  {/* Region Items */}
                  <div className="divide-y text-sm">
                      <div className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-colors">
                           <div className="font-medium flex items-center gap-3">
                                <span className="text-lg">🇺🇸</span> North America
                           </div>
                           <div className="font-bold">54%</div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-colors">
                           <div className="font-medium flex items-center gap-3">
                                <span className="text-lg">🇪🇺</span> Europe
                           </div>
                           <div className="font-bold">28%</div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-colors">
                           <div className="font-medium flex items-center gap-3">
                                <span className="text-lg">🌏</span> Asia Pacific
                           </div>
                           <div className="font-bold">12%</div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-colors">
                           <div className="font-medium flex items-center gap-3">
                                <span className="text-lg">🌍</span> Other
                           </div>
                           <div className="font-bold">6%</div>
                      </div>
                  </div>
                  
                  {/* Circular visual placeholder */}
                  <div className="p-6 flex items-center justify-center bg-muted/20 border-t mt-auto">
                        <div className="h-24 w-24 rounded-full border-[12px] border-primary border-r-muted border-b-muted flex items-center justify-center shadow-inner">
                             <div className="text-xs font-bold text-muted-foreground border border-dashed rounded-full p-2 bg-background shadow-sm">
                                  Global
                             </div>
                        </div>
                  </div>
             </CardContent>
        </Card>
      </div>
    </div>
  );
}
