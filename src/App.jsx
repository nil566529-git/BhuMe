import React, { useState } from 'react';
import { 
  LayoutDashboard, Database, Activity, Map, Eye, GitPullRequest, BarChart2, Download, Shield, Settings, 
  Search, Bell, LogOut, UploadCloud, Folder, FileText, CheckCircle, AlertTriangle, XCircle, Layers, 
  MoreVertical, Plus, Check, Link2, Scale, BarChart, Cloud, Image as ImageIcon, Clock, Cpu, 
  ArrowRight, ToggleRight, Edit2, Terminal, Calendar, Building, Trash2, Edit3, MapPin, Sliders, ChevronLeft, ChevronRight, Filter,
  PieChart, Target
} from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- LOGIN PAGE COMPONENT ---
function LoginPage({ onLogin }) {
  const [role, setRole] = useState('admin');
  const handleSubmit = (e) => { e.preventDefault(); onLogin(role); };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4"><Map className="w-8 h-8 text-blue-600" /></div>
          <h1 className="text-3xl font-bold text-slate-800">BhuMe</h1>
          <p className="text-sm text-gray-500 mt-1">Unified Land Data Platform</p>
        </div>
        <div className="flex space-x-2 mb-6 bg-slate-100 p-1.5 rounded-lg">
          <button type="button" className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setRole('admin')}>Admin Login</button>
          <button type="button" className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'visitor' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setRole('visitor')}>Visitor Login</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="text" value={role === 'admin' ? 'admin@bhume.gov.in' : 'visitor@example.com'} readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value="••••••••" readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 outline-none" /></div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 mt-2">Sign In as {role === 'admin' ? 'Admin' : 'Visitor'}</button>
        </form>
      </div>
    </div>
  );
}

// --- 1. DASHBOARD VIEW COMPONENT ---
function DashboardView({ userRole }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <StatCard title="Total Plots" value="12,482" subtitle="↑ 8% from last update" color="bg-blue-100" textColor="text-blue-600" />
        <StatCard title="Auto Accepted" value="9,264" subtitle="↑ 74% of total" color="bg-green-100" textColor="text-green-600" />
        <StatCard title="Under Review" value="2,436" subtitle="↑ 19% of total" color="bg-yellow-100" textColor="text-yellow-600" />
        <StatCard title="Needs Re-survey" value="782" subtitle="↓ 6% of total" color="bg-red-100" textColor="text-red-600" />
        <StatCard title="Datasets Integrated" value="6" subtitle="Cadastral, Drone, Revenue..." color="bg-purple-100" textColor="text-purple-600" />
      </div>

      <div className="grid grid-cols-3 gap-6 h-[400px] xl:h-[450px]">
        <div className="col-span-2 bg-white rounded-lg border shadow-sm flex flex-col relative overflow-hidden">
          <div className="h-12 border-b bg-white flex items-center px-4 space-x-2 text-xs font-medium text-gray-600 z-10 shrink-0">
            <button className="bg-slate-800 text-white px-3 py-1.5 rounded flex items-center"><Map className="w-3 h-3 mr-1" /> Base Map</button>
            <button className="px-3 py-1.5 hover:bg-gray-100 rounded bg-gray-100">Cadastral</button>
            <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Drone (Buildings)</button>
            <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Revenue</button>
            <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Land Use</button>
          </div>
          
          <div className="flex-1 bg-[#e8e4d9] relative overflow-hidden">
            <TransformWrapper initialScale={1} minScale={0.5} maxScale={8} centerOnInit={true}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-4 left-4 bg-white rounded shadow flex flex-col p-1 space-y-1 z-20">
                     <button onClick={() => zoomIn()} className="p-2 hover:bg-gray-100 rounded font-bold text-lg leading-none">+</button>
                     <button onClick={() => zoomOut()} className="p-2 hover:bg-gray-100 rounded font-bold text-lg leading-none">-</button>
                     <button onClick={() => resetTransform()} className="p-2 hover:bg-gray-100 rounded text-sm font-bold leading-none">↺</button>
                  </div>
                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                    <img src="/WhatsApp Image 2026-09-30 at 7.30.58 PM.jpeg" alt="Cadastral Map" className="w-full h-full object-cover cursor-grab active:cursor-grabbing" />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded shadow text-xs z-20 border border-gray-200">
              <h4 className="font-bold mb-2">Confidence Level</h4>
              <div className="flex items-center mb-1"><span className="w-3 h-3 bg-green-500 mr-2 rounded-sm"></span> High (≥ 0.85)</div>
              <div className="flex items-center mb-1"><span className="w-3 h-3 bg-yellow-400 mr-2 rounded-sm"></span> Medium (0.60 - 0.85)</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-red-500 mr-2 rounded-sm"></span> Low (&lt; 0.60)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm flex flex-col">
          <div className="p-4 border-b flex justify-between items-center"><h2 className="font-bold text-gray-800">Plot Details</h2><button className="text-gray-400 hover:text-gray-600">✕</button></div>
          <div className="p-4 flex-1 overflow-y-auto text-sm">
            <div className="grid grid-cols-2 gap-y-3 mb-6">
              <span className="text-gray-500">Plot ID</span><span className="font-medium text-gray-800">125</span>
              <span className="text-gray-500">Khasra No.</span><span className="font-medium text-gray-800">45/2</span>
              <span className="text-gray-500">Area</span><span className="font-medium text-gray-800">982.4 m²</span>
              <span className="text-gray-500">Land Use</span><span className="font-medium text-gray-800">Residential</span>
              <span className="text-gray-500">Owner Name</span><span className="font-medium text-gray-800">Rajesh Kumar</span>
              <span className="text-gray-500">Confidence</span><span className="font-medium text-yellow-600 flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div> 0.78 (Medium)</span>
            </div>
            <div className="flex border-b mb-4">
              <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">Sources</button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Attributes</button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700">History</button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                <div className="flex items-center space-x-3"><Map className="w-4 h-4 text-blue-500" /><div><p className="font-medium text-gray-800 text-xs">Cadastral Map</p><p className="text-[10px] text-gray-500">Geometry (0.72 confidence)</p></div></div>
                <Eye className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                <div className="flex items-center space-x-3"><Activity className="w-4 h-4 text-green-500" /><div><p className="font-medium text-gray-800 text-xs">Drone Imagery</p><p className="text-[10px] text-gray-500">Building detected (0.88 confidence)</p></div></div>
                <Eye className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
          {userRole === 'admin' ? (
            <div className="p-4 border-t flex space-x-2 shrink-0">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm font-medium">✓ Approve</button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-medium">✕ Reject</button>
              <button className="px-4 py-2 border border-gray-300 text-blue-600 rounded text-sm font-medium flex items-center justify-center hover:bg-blue-50">✎ Edit</button>
            </div>
          ) : (
            <div className="p-4 border-t shrink-0"><p className="text-xs text-center text-gray-500 italic">Login as Admin to edit or approve records.</p></div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 pb-6">
        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
          <div className="p-4 border-b flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Recent Changes</h3><a href="#" className="text-blue-500 text-xs hover:underline">View All</a></div>
          <div className="p-4 flex-1">
            <ul className="space-y-5">
              <li className="flex items-start justify-between">
                <div className="flex items-start space-x-3"><div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mt-0.5 border"><div className="w-2 h-2 rounded-full bg-green-500"></div></div><div><p className="font-semibold text-gray-800 text-xs">New Building Detected</p><p className="text-[10px] text-gray-500 mt-0.5">Plot ID: 178</p></div></div>
                <span className="text-[10px] text-gray-400">2 hours ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div className="flex items-start space-x-3"><div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mt-0.5 border"><div className="w-2 h-2 rounded-full bg-red-500"></div></div><div><p className="font-semibold text-gray-800 text-xs">Demolished Structure</p><p className="text-[10px] text-gray-500 mt-0.5">Plot ID: 342</p></div></div>
                <span className="text-[10px] text-gray-400">5 hours ago</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
          <div className="p-4 border-b flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Review Queue</h3><a href="#" className="text-blue-500 text-xs hover:underline">View All</a></div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs"><thead className="text-gray-500 bg-gray-50 border-b"><tr><th className="font-medium p-3">Plot ID</th><th className="font-medium p-3">Issue Type</th><th className="font-medium p-3">Status</th></tr></thead>
              <tbody className="text-gray-700">
                <tr className="border-b hover:bg-gray-50"><td className="p-3">287</td><td className="p-3">Boundary conflict</td><td className="p-3"><span className="text-yellow-700 bg-yellow-100 rounded px-2 py-1 text-[10px] font-medium">Pending</span></td></tr>
                <tr className="border-b hover:bg-gray-50"><td className="p-3">556</td><td className="p-3">Attribute mismatch</td><td className="p-3"><span className="text-blue-700 bg-blue-100 rounded px-2 py-1 text-[10px] font-medium">In Review</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
           <div className="p-4 border-b flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Processing Pipeline</h3><a href="#" className="text-blue-500 text-xs hover:underline">View Details</a></div>
          <div className="p-5 flex-1 relative">
              <div className="absolute left-[29px] top-5 bottom-5 w-[2px] bg-gray-200"></div>
              <ul className="space-y-6 relative">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center z-10 shrink-0 text-[10px]">✓</div>
                  <div className="ml-4 flex-1"><div className="flex justify-between items-center"><p className="text-xs font-bold text-gray-800">1. Data Ingestion</p><span className="text-[10px] text-gray-400">10:42 AM</span></div></div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-500 border-[3px] border-blue-100 flex items-center justify-center z-10 shrink-0 relative -left-0.5"></div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center"><p className="text-xs font-bold text-gray-800">2. Spatial Matching</p><span className="text-[10px] text-gray-400">11:35 AM</span></div>
                    <p className="text-[10px] text-blue-600 font-medium mt-0.5">• In Progress (78%)</p>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 2. DATA INGESTION VIEW COMPONENT ---
function DataIngestionView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Database className="w-6 h-6" /></div><div><h2 className="text-xl font-bold text-gray-800">Data Ingestion</h2><p className="text-xs text-gray-500">Upload, validate and catalog your geospatial datasets</p></div></div>
        <button className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-blue-100"><FileText className="w-4 h-4 mr-2" /> View Ingestion Guide</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg border shadow-sm p-8 flex flex-col items-center justify-center border-dashed border-2 border-blue-200 bg-blue-50/30">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md"><UploadCloud className="w-8 h-8" /></div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Drag & drop files here or <span className="text-blue-600 cursor-pointer hover:underline">browse</span></h3>
          <p className="text-sm text-gray-500 mb-6">Upload raster, vector or tabular geospatial data</p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-sm"><Folder className="w-4 h-4 mr-2"/> Browse Files</button>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center"><FileText className="w-4 h-4 mr-2 text-blue-500"/> Upload Dataset</h3>
          <form className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-600 mb-1">Dataset Name *</label><input type="text" placeholder="e.g. Drone_Survey" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="block text-xs text-gray-600 mb-1">Description</label><input type="text" placeholder="Optional" className="w-full border rounded p-2 text-xs" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-600 mb-1">Data Type *</label><select className="w-full border rounded p-2 text-xs bg-white"><option>Raster (GeoTIFF)</option></select></div>
              <div><label className="block text-xs text-gray-600 mb-1">CRS (if known)</label><select className="w-full border rounded p-2 text-xs bg-white"><option>Auto-detect if unknown</option></select></div>
            </div>
            <button type="button" className="w-full bg-blue-600 text-white font-medium py-2 rounded mt-2 flex items-center justify-center hover:bg-blue-700"><UploadCloud className="w-4 h-4 mr-2"/> Start Ingestion</button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg border shadow-sm p-4">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-sm">Recent Uploads</h3><a href="#" className="text-blue-500 text-xs hover:underline">View All</a></div>
          <table className="w-full text-left text-xs">
            <thead className="text-gray-500 border-b border-t bg-gray-50"><tr><th className="p-3 font-medium">File Name</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Progress</th></tr></thead>
            <tbody className="text-gray-700">
              <tr className="border-b"><td className="p-3 font-medium text-gray-800">Drone_Survey_Ward12.tif</td><td className="p-3 text-green-600 flex items-center mt-2"><CheckCircle className="w-3 h-3 mr-1"/> Completed</td><td className="p-3"><div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="bg-green-500 w-full h-full"></div></div></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// --- 3. PROCESSING PIPELINE VIEW COMPONENT ---
function ProcessingPipelineView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity className="w-6 h-6" /></div><div><h2 className="text-xl font-bold text-gray-800">Processing Pipeline</h2><p className="text-xs text-gray-500">End-to-end processing of geospatial datasets with AI-assisted harmonization</p></div></div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-sm"><Plus className="w-4 h-4 mr-2" /> New Processing Job</button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 overflow-x-auto">
        <div className="flex items-start justify-between min-w-[900px] relative">
          <div className="absolute top-5 left-8 right-8 h-[2px] bg-gray-100 -z-10"></div>
          <div className="flex flex-col items-center w-24">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-2 shadow"><Check className="w-5 h-5"/></div>
            <p className="text-xs font-bold text-gray-800 text-center leading-tight">1. Ingestion</p><p className="text-[10px] text-green-600 font-medium">Completed</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-2 shadow"><Check className="w-5 h-5"/></div>
            <p className="text-xs font-bold text-gray-800 text-center leading-tight">2. Geo-referencing</p><p className="text-[10px] text-green-600 font-medium">Completed</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-2 shadow ring-4 ring-blue-50"><Layers className="w-5 h-5"/></div>
            <p className="text-xs font-bold text-gray-800 text-center leading-tight">3. Feature Extraction</p><p className="text-[10px] text-blue-600 font-bold">In Progress</p>
          </div>
          {[4,5,6,7,8,9].map(step => (
            <div key={step} className="flex flex-col items-center w-24 opacity-60">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2 border"><div className="scale-75"><Cloud className="w-5 h-5"/></div></div>
              <p className="text-xs font-medium text-gray-500 text-center leading-tight">Step {step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm flex flex-col">
          <div className="p-5 border-b">
            <div className="flex justify-between items-start mb-4"><div className="flex items-center space-x-3"><Layers className="w-6 h-6 text-blue-500" /><div><h3 className="font-bold text-gray-800">Current Step: Feature Extraction</h3></div></div><span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">Processing...</span></div>
            <div className="flex items-center space-x-3 mt-4"><div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[65%] rounded-full"></div></div><span className="text-xs font-bold text-gray-700">65%</span></div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded border"><ImageIcon className="w-6 h-6 text-blue-500" /><div><p className="text-lg font-bold text-gray-800 leading-none">2,341</p><p className="text-[10px] text-gray-500 mt-1">Images Processed</p></div></div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded border"><Layers className="w-6 h-6 text-blue-500" /><div><p className="text-lg font-bold text-gray-800 leading-none">18,562</p><p className="text-[10px] text-gray-500 mt-1">Buildings Detected</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 4. CHANGE DETECTION VIEW COMPONENT ---
function ChangeDetectionView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><GitPullRequest className="w-6 h-6" /></div><div><h2 className="text-xl font-bold text-gray-800">Change Detection</h2><p className="text-xs text-gray-500">Detect and analyze changes in land use, buildings and boundaries over time</p></div></div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs text-gray-600 bg-gray-50 border rounded-lg px-3 py-2 space-x-2"><span className="text-gray-500 font-medium">Compare Period</span><div className="flex items-center bg-white border px-2 py-1 rounded shadow-sm"><Calendar className="w-3 h-3 mr-1 text-gray-400"/> 01 Jan 2023</div><ArrowRight className="w-3 h-3 text-gray-400" /><div className="flex items-center bg-white border px-2 py-1 rounded shadow-sm"><Calendar className="w-3 h-3 mr-1 text-gray-400"/> 01 Jan 2024</div></div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">Run Change Detection</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-50/50 rounded-lg p-4 border border-green-100 flex items-center space-x-4 shadow-sm"><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Building className="w-5 h-5 text-green-600" /></div><div><h3 className="text-green-700 text-xs font-medium mb-1">New Buildings</h3><p className="text-2xl font-bold text-gray-800 leading-none">342</p><p className="text-[10px] text-green-600 mt-1">↑ 12% from last period</p></div></div>
        <div className="bg-red-50/50 rounded-lg p-4 border border-red-100 flex items-center space-x-4 shadow-sm"><div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0"><Trash2 className="w-5 h-5 text-red-500" /></div><div><h3 className="text-red-700 text-xs font-medium mb-1">Demolished Structures</h3><p className="text-2xl font-bold text-gray-800 leading-none">118</p><p className="text-[10px] text-red-600 mt-1">↑ 8% from last period</p></div></div>
        <div className="bg-yellow-50/50 rounded-lg p-4 border border-yellow-100 flex items-center space-x-4 shadow-sm"><div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0"><Edit3 className="w-5 h-5 text-yellow-600" /></div><div><h3 className="text-yellow-700 text-xs font-medium mb-1">Modified Plots</h3><p className="text-2xl font-bold text-gray-800 leading-none">256</p><p className="text-[10px] text-yellow-600 mt-1">↑ 15% from last period</p></div></div>
        <div className="bg-indigo-50/50 rounded-lg p-4 border border-indigo-100 flex items-center space-x-4 shadow-sm"><div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-indigo-600" /></div><div><h3 className="text-indigo-700 text-xs font-medium mb-1">Land Use Changes</h3><p className="text-2xl font-bold text-gray-800 leading-none">73</p><p className="text-[10px] text-indigo-600 mt-1">↑ 9% from last period</p></div></div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 bg-white rounded-lg border shadow-sm relative overflow-hidden h-[450px]">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')] bg-cover bg-center grayscale opacity-80"></div>
           <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden border-l border-white shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)] z-10">
              <div className="absolute inset-y-0 right-0 w-[200%] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')] bg-cover bg-center">
                 <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
              </div>
           </div>
           <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-md"><div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-lg -ml-3.5"><ChevronLeft className="w-3 h-3 text-gray-500" /><ChevronRight className="w-3 h-3 text-gray-500 -ml-1" /></div></div>
        </div>
        <div className="col-span-1 bg-white rounded-lg border shadow-sm flex flex-col">
          <div className="p-4 border-b flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm flex items-center"><Filter className="w-4 h-4 mr-2 text-blue-500"/> Change Filters</h3></div>
          <div className="p-5 flex-1 space-y-5">
             <button className="w-full mt-2 bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 5. ANALYTICS VIEW COMPONENT (NEW) ---
function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><BarChart2 className="w-6 h-6" /></div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
            <p className="text-xs text-gray-500">Insights and statistics from integrated geospatial data</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs text-gray-600 bg-gray-50 border rounded-lg px-3 py-2 space-x-2">
             <Calendar className="w-4 h-4 text-gray-400" />
             <span>01 Jan 2023 - 01 Jan 2024</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Area Mapped */}
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 flex items-center space-x-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Layers className="w-5 h-5 text-blue-600" /></div>
          <div>
            <h3 className="text-gray-500 text-xs font-medium mb-1">Total Area Mapped</h3>
            <p className="text-xl font-bold text-gray-800 leading-none">124.8 km²</p>
            <p className="text-[10px] text-green-600 mt-1 font-medium">↑ 12% from last period</p>
          </div>
        </div>
        {/* Total Plots */}
        <div className="bg-green-50/50 rounded-lg p-4 border border-green-100 flex items-center space-x-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Map className="w-5 h-5 text-green-600" /></div>
          <div>
            <h3 className="text-gray-500 text-xs font-medium mb-1">Total Plots</h3>
            <p className="text-xl font-bold text-gray-800 leading-none">12,482</p>
            <p className="text-[10px] text-green-600 mt-1 font-medium">↑ 8% from last period</p>
          </div>
        </div>
        {/* Buildings Detected */}
        <div className="bg-yellow-50/50 rounded-lg p-4 border border-yellow-100 flex items-center space-x-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0"><Building className="w-5 h-5 text-yellow-600" /></div>
          <div>
            <h3 className="text-gray-500 text-xs font-medium mb-1">Buildings Detected</h3>
            <p className="text-xl font-bold text-gray-800 leading-none">9,264</p>
            <p className="text-[10px] text-green-600 mt-1 font-medium">↑ 15% from last period</p>
          </div>
        </div>
        {/* Changes Detected */}
        <div className="bg-red-50/50 rounded-lg p-4 border border-red-100 flex items-center space-x-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
          <div>
            <h3 className="text-gray-500 text-xs font-medium mb-1">Changes Detected</h3>
            <p className="text-xl font-bold text-gray-800 leading-none">789</p>
            <p className="text-[10px] text-red-600 mt-1 font-medium">↑ 22% from last period</p>
          </div>
        </div>
      </div>

      {/* Middle Row 1: Donut, Bar, Donut */}
      <div className="grid grid-cols-3 gap-6">
        {/* Land Use Distribution */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-sm">Land Use Distribution</h3><a href="#" className="text-blue-500 text-xs">View Details</a></div>
          <div className="flex-1 flex items-center justify-between">
            {/* Donut Chart SVG */}
            <div className="relative w-32 h-32">
               <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                 {/* Residential 45% (blue) */}
                 <path className="text-blue-500" strokeDasharray="45, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" />
                 {/* Commercial 12.6% (yellow) */}
                 <path className="text-yellow-400" strokeDasharray="12.6, 100" strokeDashoffset="-45" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" />
                 {/* Agricultural 18.4% (green) */}
                 <path className="text-green-500" strokeDasharray="18.4, 100" strokeDashoffset="-57.6" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" />
                 {/* Industrial 8.1% (red) */}
                 <path className="text-red-500" strokeDasharray="8.1, 100" strokeDashoffset="-76" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" />
                 {/* Public/Utility 6.3% (purple) */}
                 <path className="text-purple-500" strokeDasharray="6.3, 100" strokeDashoffset="-84.1" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" />
                 {/* Other 9.4% (gray) */}
                 <path className="text-gray-300" strokeDasharray="9.4, 100" strokeDashoffset="-90.4" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-lg font-bold text-gray-800 leading-none">12,482</span>
                 <span className="text-[9px] text-gray-500">Total Plots</span>
               </div>
            </div>
            
            <div className="space-y-1.5 text-[9px] w-1/2">
              <div className="flex justify-between items-center"><div className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-sm mr-1.5"></div><span className="text-gray-600">Residential</span></div><span className="text-gray-400">45.2% (5,640)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-sm mr-1.5"></div><span className="text-gray-600">Commercial</span></div><span className="text-gray-400">12.6% (1,575)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-sm mr-1.5"></div><span className="text-gray-600">Agricultural</span></div><span className="text-gray-400">18.4% (2,298)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-sm mr-1.5"></div><span className="text-gray-600">Industrial</span></div><span className="text-gray-400">8.1% (1,012)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-sm mr-1.5"></div><span className="text-gray-600">Public/Utility</span></div><span className="text-gray-400">6.3% (786)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center"><div className="w-2 h-2 bg-gray-300 rounded-sm mr-1.5"></div><span className="text-gray-600">Other</span></div><span className="text-gray-400">9.4% (1,171)</span></div>
            </div>
          </div>
        </div>

        {/* Change Statistics Bar Chart */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2"><h3 className="font-bold text-gray-800 text-sm">Change Statistics</h3><a href="#" className="text-blue-500 text-xs">View Details</a></div>
          <div className="flex items-center space-x-3 text-[9px] text-gray-600 mb-2 justify-center">
             <div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-sm mr-1"></div>New</div>
             <div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-sm mr-1"></div>Demolished</div>
             <div className="flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-sm mr-1"></div>Modified</div>
             <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-sm mr-1"></div>Land Use Change</div>
          </div>
          
          <div className="flex-1 flex items-end justify-between px-2 pt-2 border-l border-b border-gray-200 relative pb-1 h-28">
            {/* Fake Y-Axis */}
            <div className="absolute -left-6 top-0 bottom-4 flex flex-col justify-between text-[8px] text-gray-400 text-right pr-1">
              <span>120</span><span>90</span><span>60</span><span>30</span><span>0</span>
            </div>
            
            {/* Chart Columns (Groups of 4 bars) */}
            {[
              [20, 10, 15, 5], [30, 25, 20, 10], [40, 35, 30, 15], [50, 40, 45, 20], 
              [60, 45, 50, 25], [70, 50, 60, 30], [80, 55, 75, 35], [90, 60, 80, 40], 
              [75, 45, 55, 30], [65, 35, 45, 25], [55, 30, 35, 15], [45, 20, 25, 10]
            ].map((month, idx) => (
              <div key={idx} className="flex items-end space-x-px w-[6%] h-full">
                <div style={{height: `${month[0]}%`}} className="w-1/4 bg-green-500 rounded-t-sm hover:opacity-80 transition-opacity"></div>
                <div style={{height: `${month[1]}%`}} className="w-1/4 bg-red-500 rounded-t-sm hover:opacity-80 transition-opacity"></div>
                <div style={{height: `${month[2]}%`}} className="w-1/4 bg-yellow-400 rounded-t-sm hover:opacity-80 transition-opacity"></div>
                <div style={{height: `${month[3]}%`}} className="w-1/4 bg-purple-500 rounded-t-sm hover:opacity-80 transition-opacity"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 text-[8px] text-gray-400 mt-1">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Confidence Distribution Donut */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-sm">Confidence Distribution</h3><a href="#" className="text-blue-500 text-xs">View Details</a></div>
          <div className="flex-1 flex items-center justify-between">
            {/* Donut Chart SVG */}
            <div className="relative w-32 h-32">
               <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                 {/* High 62.1% (green) */}
                 <path className="text-green-500" strokeDasharray="62.1, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="7" />
                 {/* Medium 26.4% (yellow) */}
                 <path className="text-yellow-400" strokeDasharray="26.4, 100" strokeDashoffset="-62.1" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="7" />
                 {/* Low 11.5% (red) */}
                 <path className="text-red-500" strokeDasharray="11.5, 100" strokeDashoffset="-88.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="7" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-lg font-bold text-gray-800 leading-none">12,482</span>
                 <span className="text-[9px] text-gray-500">Total Features</span>
               </div>
            </div>
            
            <div className="space-y-4 text-[10px] w-1/2 ml-4">
              <div>
                <div className="flex items-center mb-0.5"><div className="w-2 h-2 bg-green-500 rounded-sm mr-1.5"></div><span className="text-gray-600 font-medium">High (≥ 0.85)</span></div>
                <p className="text-gray-400 ml-3.5">62.1% (7,754)</p>
              </div>
              <div>
                <div className="flex items-center mb-0.5"><div className="w-2 h-2 bg-yellow-400 rounded-sm mr-1.5"></div><span className="text-gray-600 font-medium">Medium (0.60 - 0.85)</span></div>
                <p className="text-gray-400 ml-3.5">26.4% (3,295)</p>
              </div>
              <div>
                <div className="flex items-center mb-0.5"><div className="w-2 h-2 bg-red-500 rounded-sm mr-1.5"></div><span className="text-gray-600 font-medium">Low (&lt; 0.60)</span></div>
                <p className="text-gray-400 ml-3.5">11.5% (1,433)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row 2: Map, Bar Stacks, KPI Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Spatial Overview Map */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col relative h-64">
           <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-800 text-sm">Spatial Overview</h3>
             <select className="border border-gray-200 rounded p-1 text-[10px] bg-gray-50 outline-none text-gray-600"><option>Confidence Level</option></select>
           </div>
           <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600')] bg-cover bg-center rounded-lg border border-gray-200 relative overflow-hidden">
              {/* Fake Confidence Overlays */}
              <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-green-500/40 mix-blend-multiply rotate-45 blur-sm"></div>
              <div className="absolute bottom-[10%] right-[30%] w-24 h-24 bg-red-500/40 mix-blend-multiply -rotate-12 blur-sm"></div>
              <div className="absolute top-[10%] right-[10%] w-20 h-20 bg-yellow-400/40 mix-blend-multiply blur-sm"></div>
              
              <div className="absolute top-2 left-2 bg-white rounded shadow flex flex-col p-1 space-y-1 z-20 opacity-80">
                <button className="p-1 hover:bg-gray-100 rounded text-xs font-bold leading-none">+</button>
                <button className="p-1 hover:bg-gray-100 rounded text-xs font-bold leading-none">-</button>
                <button className="p-1 hover:bg-gray-100 rounded"><Layers className="w-3 h-3 text-gray-600"/></button>
              </div>
              <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded shadow text-[9px] z-20 border border-gray-200">
                 <h4 className="font-bold mb-1">Confidence Level</h4>
                 <div className="flex items-center"><div className="w-2 h-2 bg-green-500 mr-1.5 rounded-sm"></div>High</div>
                 <div className="flex items-center my-0.5"><div className="w-2 h-2 bg-yellow-400 mr-1.5 rounded-sm"></div>Medium</div>
                 <div className="flex items-center"><div className="w-2 h-2 bg-red-500 mr-1.5 rounded-sm"></div>Low</div>
              </div>
           </div>
        </div>

        {/* Data Source Contribution */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col h-64">
           <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-sm">Data Source Contribution</h3><a href="#" className="text-blue-500 text-xs">View Details</a></div>
           
           <div className="flex-1 space-y-3 mt-2 overflow-y-auto pr-2">
             {[
               { name: "Cadastral Map", pct: "28%", split: [30, 40, 20, 10] },
               { name: "Drone Imagery", pct: "24%", split: [25, 35, 30, 10] },
               { name: "Revenue Records", pct: "18%", split: [40, 20, 10, 30] },
               { name: "GNSS/CORS", pct: "12%", split: [50, 10, 20, 20] },
               { name: "Municipal GIS", pct: "10%", split: [20, 40, 20, 20] },
               { name: "Utility Data", pct: "6%", split: [10, 30, 10, 50] },
               { name: "Others", pct: "2%", split: [25, 25, 25, 25] },
             ].map((src, i) => (
               <div key={i} className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600 w-24 truncate">{src.name}</span>
                  <div className="flex-1 h-2.5 mx-3 bg-gray-100 rounded-sm flex overflow-hidden">
                     <div style={{width: `${src.split[0]}%`}} className="bg-blue-500 h-full border-r border-white/20"></div>
                     <div style={{width: `${src.split[1]}%`}} className="bg-green-500 h-full border-r border-white/20"></div>
                     <div style={{width: `${src.split[2]}%`}} className="bg-yellow-400 h-full border-r border-white/20"></div>
                     <div style={{width: `${src.split[3]}%`}} className="bg-purple-500 h-full"></div>
                  </div>
                  <span className="text-gray-400 w-6 text-right">{src.pct}</span>
               </div>
             ))}
           </div>
           
           <div className="flex items-center justify-center space-x-3 text-[9px] text-gray-600 mt-4 border-t pt-2">
             <div className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-sm mr-1"></div>Geometry</div>
             <div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-sm mr-1"></div>Attributes</div>
             <div className="flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-sm mr-1"></div>Buildings</div>
             <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-sm mr-1"></div>Other</div>
           </div>
        </div>

        {/* Processing Performance (2x2) */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col h-64">
           <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-sm">Processing Performance</h3><a href="#" className="text-blue-500 text-xs">View Details</a></div>
           <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="bg-blue-50/50 border border-blue-100 rounded p-3 flex flex-col justify-center">
                 <div className="flex items-center space-x-2 mb-1"><Clock className="w-4 h-4 text-blue-500"/><span className="text-[10px] text-gray-500 font-medium">Avg. Processing Time</span></div>
                 <p className="text-lg font-bold text-gray-800 ml-6">18.4 min</p>
                 <p className="text-[9px] text-green-600 ml-6 mt-1">↓ 32% from last run</p>
              </div>
              <div className="bg-cyan-50/50 border border-cyan-100 rounded p-3 flex flex-col justify-center">
                 <div className="flex items-center space-x-2 mb-1"><Database className="w-4 h-4 text-cyan-500"/><span className="text-[10px] text-gray-500 font-medium">Data Processed</span></div>
                 <p className="text-lg font-bold text-gray-800 ml-6">256 GB</p>
                 <p className="text-[9px] text-green-600 ml-6 mt-1">↑ 18% from last run</p>
              </div>
              <div className="bg-green-50/50 border border-green-100 rounded p-3 flex flex-col justify-center">
                 <div className="flex items-center space-x-2 mb-1"><CheckCircle className="w-4 h-4 text-green-500"/><span className="text-[10px] text-gray-500 font-medium">Jobs Completed</span></div>
                 <p className="text-lg font-bold text-gray-800 ml-6">48</p>
                 <p className="text-[9px] text-green-600 ml-6 mt-1">↑ 14% from last week</p>
              </div>
              <div className="bg-red-50/50 border border-red-100 rounded p-3 flex flex-col justify-center">
                 <div className="flex items-center space-x-2 mb-1"><AlertTriangle className="w-4 h-4 text-red-500"/><span className="text-[10px] text-gray-500 font-medium">Failed Jobs</span></div>
                 <p className="text-lg font-bold text-gray-800 ml-6">3</p>
                 <p className="text-[9px] text-red-600 ml-6 mt-1">↓ 50% from last week</p>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Row: Table, Line Chart, Data Quality */}
      <div className="grid grid-cols-3 gap-6 pb-6">
        
        {/* Top Areas With Changes Table */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-gray-800 text-sm">Top Areas with Changes</h3><a href="#" className="text-blue-500 text-xs">View All</a></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead className="text-gray-500 border-b bg-gray-50">
                <tr><th className="p-2 font-medium">Rank</th><th className="p-2 font-medium">Ward/Area</th><th className="p-2 font-medium">Total Changes</th><th className="p-2 font-medium">Major Change Type</th></tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b"><td className="p-2">1</td><td className="p-2 font-medium">Ward 12</td><td className="p-2">142</td><td className="p-2">New Buildings</td></tr>
                <tr className="border-b"><td className="p-2">2</td><td className="p-2 font-medium">Ward 8</td><td className="p-2">98</td><td className="p-2">Modified Plots</td></tr>
                <tr className="border-b"><td className="p-2">3</td><td className="p-2 font-medium">Ward 5</td><td className="p-2">76</td><td className="p-2">Demolished Structures</td></tr>
                <tr className="border-b"><td className="p-2">4</td><td className="p-2 font-medium">Ward 3</td><td className="p-2">64</td><td className="p-2">Land Use Change</td></tr>
                <tr><td className="p-2">5</td><td className="p-2 font-medium">Ward 11</td><td className="p-2">58</td><td className="p-2">New Buildings</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Trends Line Chart */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2"><h3 className="font-bold text-gray-800 text-sm">Monthly Trends</h3><select className="border border-gray-200 rounded p-1 text-[10px] bg-gray-50 outline-none text-gray-600"><option>All Metrics</option></select></div>
          <div className="flex items-center justify-center space-x-4 text-[9px] text-gray-600 mb-2">
             <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></div><div className="w-2 h-0.5 bg-blue-500 mr-1.5 -ml-2.5"></div>Buildings Detected</div>
             <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div><div className="w-2 h-0.5 bg-green-500 mr-1.5 -ml-2.5"></div>Plots Processed</div>
             <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></div><div className="w-2 h-0.5 bg-red-500 mr-1.5 -ml-2.5"></div>Changes Detected</div>
          </div>
          <div className="flex-1 relative flex text-[8px] text-gray-400">
             <div className="flex flex-col justify-between text-right pr-2 pb-4"><span>500</span><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div>
             <div className="flex-1 border-l border-b border-gray-200 relative mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible preserve-aspect-ratio-none">
                   <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.5" /><line x1="0" y1="40" x2="100" y2="40" stroke="#f3f4f6" strokeWidth="0.5" /><line x1="0" y1="60" x2="100" y2="60" stroke="#f3f4f6" strokeWidth="0.5" /><line x1="0" y1="80" x2="100" y2="80" stroke="#f3f4f6" strokeWidth="0.5" />
                   {/* Green Line */}
                   <polyline points="0,85 10,70 20,60 30,55 40,40 50,35 60,30 70,35 80,30 90,40 100,50" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   {[0,10,20,30,40,50,60,70,80,90,100].map((x, i) => { const y = [85,70,60,55,40,35,30,35,30,40,50][i]; return <circle key={'g2'+i} cx={x} cy={y} r="1.5" fill="#22c55e" /> })}
                   {/* Blue Line */}
                   <polyline points="0,95 10,90 20,85 30,85 40,80 50,75 60,70 70,75 80,65 90,75 100,80" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   {[0,10,20,30,40,50,60,70,80,90,100].map((x, i) => { const y = [95,90,85,85,80,75,70,75,65,75,80][i]; return <circle key={'b2'+i} cx={x} cy={y} r="1.5" fill="#3b82f6" /> })}
                   {/* Red Line */}
                   <polyline points="0,98 10,95 20,95 30,96 40,92 50,90 60,85 70,88 80,85 90,90 100,92" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   {[0,10,20,30,40,50,60,70,80,90,100].map((x, i) => { const y = [98,95,95,96,92,90,85,88,85,90,92][i]; return <circle key={'r2'+i} cx={x} cy={y} r="1.5" fill="#ef4444" /> })}
                </svg>
             </div>
          </div>
          <div className="flex justify-between pl-8 text-[8px] text-gray-400 mt-0 pt-0.5"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
        </div>

        {/* Data Quality Metrics */}
        <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-sm">Data Quality Metrics</h3><a href="#" className="text-blue-500 text-xs">View Details</a></div>
          <div className="flex-1 grid grid-cols-2 gap-3">
             <div className="bg-green-50/50 border border-green-100 rounded p-3 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-1"><CheckCircle className="w-4 h-4 text-green-500"/><span className="text-[9px] text-gray-500 font-medium">Valid Geometries</span></div>
                <p className="text-lg font-bold text-gray-800 ml-6">98.7%</p>
                <p className="text-[9px] text-green-600 ml-6 mt-1">↑ 1.2%</p>
             </div>
             <div className="bg-blue-50/50 border border-blue-100 rounded p-3 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-1"><Layers className="w-4 h-4 text-blue-500"/><span className="text-[9px] text-gray-500 font-medium">Attribute Completeness</span></div>
                <p className="text-lg font-bold text-gray-800 ml-6">96.4%</p>
                <p className="text-[9px] text-green-600 ml-6 mt-1">↑ 2.1%</p>
             </div>
             <div className="bg-yellow-50/50 border border-yellow-100 rounded p-3 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-1"><Link2 className="w-4 h-4 text-yellow-500"/><span className="text-[9px] text-gray-500 font-medium">Matching Accuracy</span></div>
                <p className="text-lg font-bold text-gray-800 ml-6">92.3%</p>
                <p className="text-[9px] text-green-600 ml-6 mt-1">↑ 4.6%</p>
             </div>
             <div className="bg-purple-50/50 border border-purple-100 rounded p-3 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-1"><Target className="w-4 h-4 text-purple-500"/><span className="text-[9px] text-gray-500 font-medium">Topology Errors</span></div>
                <p className="text-lg font-bold text-gray-800 ml-6">1.3%</p>
                <p className="text-[9px] text-green-600 ml-6 mt-1">↓ 0.7%</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MAIN APP COMPONENT (Router) ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return <DashboardView userRole={userRole} />;
      case 'data-ingestion': return <DataIngestionView />;
      case 'pipeline': return <ProcessingPipelineView />;
      case 'change-detection': return <ChangeDetectionView />;
      case 'analytics': return <AnalyticsView />;
      default: return <div className="p-10 text-center text-gray-500">Screen under construction.</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans overflow-hidden">
      <aside className="w-64 bg-slate-900 text-gray-300 flex flex-col border-r border-slate-800 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <Map className="w-6 h-6 text-blue-400 mr-3" />
          <div><h1 className="text-xl font-bold text-white tracking-wide">BhuMe</h1><p className="text-[10px] text-gray-400">Unified Land Data Platform</p></div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            {userRole === 'admin' && (
              <>
                <NavItem icon={<Database />} label="Data Ingestion" active={currentView === 'data-ingestion'} onClick={() => setCurrentView('data-ingestion')} />
                <NavItem icon={<Activity />} label="Processing Pipeline" active={currentView === 'pipeline'} onClick={() => setCurrentView('pipeline')} />
              </>
            )}
            <NavItem icon={<Map />} label="Map Viewer" />
            <NavItem icon={<GitPullRequest />} label="Change Detection" active={currentView === 'change-detection'} onClick={() => setCurrentView('change-detection')} />
            {userRole === 'admin' && <NavItem icon={<Eye />} label="Review Queue" badge="12" />}
            <NavItem icon={<BarChart2 />} label="Analytics" active={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} />
            <NavItem icon={<Download />} label="Data Export" />
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-96">
            <Search className="w-4 h-4 text-gray-500 mr-2" /><input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700" />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 border-l pl-6">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ${userRole === 'admin' ? 'bg-slate-800' : 'bg-blue-500'}`}>{userRole === 'admin' ? 'NK' : 'VI'}</div>
                <div className="text-sm"><p className="font-semibold text-gray-800 leading-tight">{userRole === 'admin' ? 'Admin User' : 'Visitor Account'}</p></div>
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, badge, onClick }) {
  return (
    <li>
      <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} className={`flex items-center px-6 py-3 text-sm transition-colors ${active ? 'bg-blue-900/40 text-blue-400 border-l-4 border-blue-500' : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
        <span className="w-5 h-5 mr-3">{icon}</span><span className="flex-1">{label}</span>
        {badge && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>}
      </a>
    </li>
  );
}

function StatCard({ title, value, subtitle, color, textColor }) {
  return (
    <div className="bg-white rounded-lg p-4 border flex items-center space-x-4 shadow-sm">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shrink-0`}></div>
      <div>
        <h3 className="text-gray-500 text-xs font-medium mb-1">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-[10px] text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}