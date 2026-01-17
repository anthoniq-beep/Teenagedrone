import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, isMockMode } from '@/lib/supabase';
import { ArrowLeft, Save, User, Phone, Clock, FileText, MessageSquare } from 'lucide-react';

interface Booking {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  status?: string;
  notes?: string;
}

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (id) fetchBooking(id);
  }, [id]);

  const fetchBooking = async (bookingId: string) => {
    try {
      setLoading(true);
      if (isMockMode) {
        // Mock data
        const mockBooking = { 
          id: parseInt(bookingId), 
          created_at: new Date().toISOString(), 
          name: '张三 (演示)', 
          phone: '13800138000',
          status: 'pending',
          notes: '这是演示备注信息'
        };
        setBooking(mockBooking);
        setStatus(mockBooking.status);
        setNotes(mockBooking.notes);
      } else {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .single();

        if (error) throw error;
        setBooking(data);
        setStatus(data.status || 'pending');
        setNotes(data.notes || '');
      }
    } catch (err: any) {
      console.error('Error fetching booking:', err);
      alert('加载失败');
      navigate('/admin/bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (isMockMode) {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert('演示模式：保存成功');
      } else {
        const { error } = await supabase
          .from('bookings')
          .update({ status, notes })
          .eq('id', id);

        if (error) throw error;
        alert('保存成功');
      }
      navigate('/admin/bookings');
    } catch (err: any) {
      alert('保存失败: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleWeChatAdd = () => {
    if (!booking?.phone) return;
    navigator.clipboard.writeText(booking.phone).then(() => {
      alert(`已复制手机号: ${booking.phone}\n\n请手动打开微信，粘贴手机号添加好友。`);
    }).catch(() => {
      alert('复制失败，请手动复制手机号');
    });
  };

  if (loading) return <div className="p-8 text-center">加载中...</div>;
  if (!booking) return <div className="p-8 text-center">未找到记录</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/admin/bookings')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回列表
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">学员信息详情</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === 'completed' ? 'bg-green-100 text-green-800' : 
            status === 'contacted' ? 'bg-blue-100 text-blue-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {status === 'completed' ? '已报名' : status === 'contacted' ? '已跟进' : '待处理'}
          </span>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  学员姓名
                </label>
                <div className="flex items-center text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <User className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="font-medium">{booking.name}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  提交时间
                </label>
                <div className="flex items-center text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{new Date(booking.created_at).toLocaleString('zh-CN')}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                联系电话
              </label>
              <div className="flex items-center justify-between text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="font-medium">{booking.phone}</span>
                </div>
                <button 
                  onClick={handleWeChatAdd}
                  className="flex items-center px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  加微信
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 ml-1">
                * 点击“加微信”将复制号码并尝试打开微信电脑版
              </p>
            </div>
          </div>

          {/* Edit Section */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-500" />
              跟进记录
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">当前状态</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="pending">待处理</option>
                  <option value="contacted">已跟进 (意向沟通中)</option>
                  <option value="completed">已报名 (转化成功)</option>
                  <option value="closed">已关闭 (无意向)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">沟通备注</label>
                <textarea
                  rows={6}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="记录沟通情况、家长需求、试听课安排等信息..."
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? '保存中...' : '保存更改'}
          </button>
        </div>
      </div>
    </div>
  );
}
