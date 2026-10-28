'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ClipboardCheck,
  Clock3,
  Gamepad2,
  History,
  CupSoda,
  Popcorn,
  Cookie,
  Utensils,
  Play,
  Plus,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquareText,
  Moon,
  MoreHorizontal,
  Search,
  Send,
  ShieldCheck,
  Sun,
  Users,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'

type Device = { id: string; name: string; type: string; room: string; status: 'available' | 'playing' | 'maintenance'; duration?: string; game?: string; price?: string }

const devices: Device[] = [
  { id: 'PS5-01', name: 'PS5 · 01', type: 'PlayStation 5', room: 'القاعة الرئيسية', status: 'available' },
  { id: 'PS5-02', name: 'PS5 · 02', type: 'PlayStation 5', room: 'القاعة الرئيسية', status: 'playing', duration: '01:24', game: 'EA FC 25', price: '18.00 ر.س' },
  { id: 'PS5-03', name: 'PS5 · 03', type: 'PlayStation 5', room: 'القاعة الرئيسية', status: 'available' },
  { id: 'PS4-01', name: 'PS4 · 01', type: 'PlayStation 4', room: 'القاعة الرئيسية', status: 'maintenance' },
  { id: 'PS5-04', name: 'PS5 · 04', type: 'PlayStation 5', room: 'الغرفة الخاصة A', status: 'playing', duration: '00:42', game: 'Call of Duty', price: '12.00 ر.س' },
  { id: 'PS5-05', name: 'PS5 · 05', type: 'PlayStation 5', room: 'الغرفة الخاصة A', status: 'available' },
  { id: 'PS5-06', name: 'PS5 · 06', type: 'PlayStation 5', room: 'الغرفة الخاصة B', status: 'available' },
  { id: 'PS5-07', name: 'PS5 · 07', type: 'PlayStation 5', room: 'الغرفة الخاصة B', status: 'playing', duration: '02:08', game: 'Gran Turismo 7', price: '30.00 ر.س' },
]

const timeline = [
  { time: '10:42', title: 'بدء جلسة لعب', detail: 'PS5-04 · جلسة فردية', tone: 'green' },
  { time: '10:16', title: 'استلام نقدية', detail: 'عملية #TX-10482 · 30.00 ر.س', tone: 'gold' },
  { time: '09:58', title: 'تسجيل دخول الشيفت', detail: 'نقطة البيع الرئيسية', tone: 'blue' },
]

export function StaffDashboard() {
  const [dark, setDark] = useState(true)
  const [activeNav, setActiveNav] = useState('overview')
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [mode, setMode] = useState<'single' | 'multi'>('single')
  const [message, setMessage] = useState('')
  const [sentMessages, setSentMessages] = useState<string[]>([])
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('ghost-theme')
    if (saved) setDark(saved === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    window.localStorage.setItem('ghost-theme', dark ? 'dark' : 'light')
  }, [dark])

  const grouped = useMemo(() => {
    return devices.reduce<Record<string, Device[]>>((acc, device) => {
      acc[device.room] = [...(acc[device.room] || []), device]
      return acc
    }, {})
  }, [])

  const navItems = [
    { id: 'overview', label: 'الرئيسية', en: 'Operations', icon: LayoutGrid },
    { id: 'devices', label: 'الأجهزة والجلسات', en: 'Devices & sessions', icon: Gamepad2 },
    { id: 'products', label: 'الطلبات والمنتجات', en: 'Orders & products', icon: Zap },
    { id: 'payments', label: 'الفواتير والمدفوعات', en: 'Invoices & payments', icon: WalletCards },
    { id: 'shift', label: 'شيفتي', en: 'My shift', icon: ClipboardCheck },
    { id: 'messages', label: 'الرسائل', en: 'Messages & handover', icon: MessageSquareText, count: 2 },
    { id: 'history', label: 'سجل نشاطي', en: 'My history', icon: History },
  ]

  const status = { available: { label: 'متاح', cls: 'available' }, playing: { label: 'قيد التشغيل', cls: 'playing' }, maintenance: { label: 'صيانة', cls: 'maintenance' } }

  function sendMessage() {
    if (!message.trim()) return
    setSentMessages((items) => [...items, message.trim()])
    setMessage('')
  }

  return (
    <main className="app-shell" dir="rtl">
      <aside className={`sidebar ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark">G</div>
          <div><strong>GHOST</strong><span>PLAYSTATION LOUNGE</span></div>
          <button className="icon-button mobile-close" aria-label="إغلاق القائمة" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <div className="venue-card"><span className="venue-dot" />فرع النخيل <b>مفتوح</b><small>الوردية الصباحية · 09:00—17:00</small></div>
        <nav className="nav-list" aria-label="تنقل الموظف">
          <p className="nav-label">مساحة العمل</p>
          {navItems.map((item) => {
            const Icon = item.icon
            return <button key={item.id} className={`nav-item ${activeNav === item.id ? 'active' : ''}`} onClick={() => { setActiveNav(item.id); setMobileNav(false) }}><Icon size={19} /><span>{item.label}<small>{item.en}</small></span>{item.count && <em>{item.count}</em>}</button>
          })}
        </nav>
        <div className="sidebar-bottom"><div className="user-card"><div className="avatar">ن</div><div><strong>نورة العتيبي</strong><small>كاشير · موظفة وردية</small></div><MoreHorizontal size={18} /></div><button className="logout"><LogOut size={17} /> تسجيل الخروج</button></div>
      </aside>

      <section className="content-area">
        <header className="topbar"><button className="icon-button menu-button" onClick={() => setMobileNav(true)} aria-label="فتح القائمة"><Menu size={21} /></button><div className="breadcrumbs"><span>مساحة الموظفين</span><ChevronLeft size={14} /><strong>{navItems.find(n => n.id === activeNav)?.label}</strong></div><div className="top-actions"><div className="sync-state"><span /> متصل الآن</div><button className="icon-button notification" aria-label="التنبيهات"><Bell size={19} /><i>2</i></button><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="تبديل المظهر">{dark ? <Sun size={18} /> : <Moon size={18} />}<span>{dark ? 'فاتح' : 'داكن'}</span></button></div></header>

        {activeNav === 'overview' && <>
          <div className="page-heading"><div><p className="eyebrow">الثلاثاء، 24 سبتمبر 2024 · 10:46 ص</p><h1>صباح الخير، نورة <span>—</span></h1><p className="subheading">هذه نظرة سريعة على ما يحتاج انتباهك خلال ورديتك.</p></div><div className="shift-pill"><span className="live-pulse" /><div><b>شيفتك الحالية</b><strong>09:00 — 17:00</strong></div><ArrowLeftRight size={17} /></div></div>
          <div className="notice-bar"><div className="notice-icon"><MessageSquareText size={17} /></div><div><strong>ملاحظة من الشيفت السابق</strong><p>يرجى متابعة جهاز PS5-07 — العميل سيعود الساعة 11:30 لاستكمال الجلسة.</p></div><button onClick={() => setActiveNav('messages')}>عرض التسليم <ChevronLeft size={16} /></button></div>
          <div className="section-header"><div><h2>الأجهزة والجلسات</h2><p>إدارة سريعة لحالة الأجهزة في مساحتك</p></div><div className="legend"><span><i className="dot green" /> متاح <b>3</b></span><span><i className="dot amber" /> قيد التشغيل <b>3</b></span><span><i className="dot red" /> صيانة <b>1</b></span></div></div>
          <div className="device-groups">{Object.entries(grouped).map(([room, roomDevices]) => <section className="room-section" key={room}><div className="room-title"><div><h3>{room}</h3><span>{roomDevices.length} أجهزة · <b>{roomDevices.filter(d => d.status === 'available').length} متاحة الآن</b></span></div><button className="text-button">عرض الكل <ChevronLeft size={15} /></button></div><div className="device-grid">{roomDevices.map((device) => <button className={`device-card ${device.status}`} key={device.id} onClick={() => device.status === 'available' && setSelectedDevice(device)} disabled={device.status === 'maintenance'}><div className="device-card-top"><span className="device-id">{device.id}</span><span className={`status-label ${status[device.status].cls}`}><i />{status[device.status].label}</span></div><div className="device-icon"><Gamepad2 size={23} /></div><h4>{device.name}</h4><p>{device.type}</p>{device.status === 'playing' && <div className="session-info"><span><Clock3 size={14} /> {device.duration}</span><span>{device.price}</span><small>{device.game}</small></div>}{device.status === 'available' && <span className="start-hint">اضغط لبدء جلسة <Zap size={14} /></span>}{device.status === 'maintenance' && <span className="maintenance-note">غير متاح مؤقتاً</span>}</button>)}</div></section>)}</div>
          <div className="bottom-grid"><section className="panel activity-panel"><div className="panel-heading"><div><h2>آخر النشاطات</h2><p>أحدث العمليات في شيفتك</p></div><button className="text-button" onClick={() => setActiveNav('history')}>السجل الكامل <ChevronLeft size={15} /></button></div><div className="timeline">{timeline.map((event) => <div className="timeline-item" key={event.time}><span className={`timeline-dot ${event.tone}`} /><time>{event.time}</time><div><strong>{event.title}</strong><p>{event.detail}</p></div></div>)}</div></section><section className="panel handover-panel"><div className="panel-heading"><div><h2>تسليم سريع</h2><p>اترك ملاحظة للموظف التالي</p></div><MessageSquareText size={19} className="panel-icon" /></div><div className="message-preview"><div className="avatar small">س</div><div><strong>سلمان الحربي <span>من الشيفت السابق</span></strong><p>تمت مراجعة الصندوق حتى 09:00. كل شيء مطابق.</p><time>منذ ساعة</time></div></div><button className="handover-action" onClick={() => setActiveNav('messages')}>فتح مركز التسليم <ChevronLeft size={16} /></button></section></div>
        </>}

        {activeNav === 'devices' && <DevicesView onBack={() => setActiveNav('overview')} onSelect={(device) => setSelectedDevice(device)} />}
        {activeNav === 'products' && <ProductsView />}
        {activeNav === 'payments' && <PaymentsView />}
        {activeNav === 'shift' && <ShiftView onBack={() => setActiveNav('overview')} />}
        {activeNav === 'messages' && <MessagesView message={message} setMessage={setMessage} sentMessages={sentMessages} sendMessage={sendMessage} />}
        {activeNav === 'history' && <HistoryView />}
      </section>

      {selectedDevice && <div className="modal-backdrop" onClick={() => setSelectedDevice(null)}><div className="session-modal" onClick={(e) => e.stopPropagation()}><div className="modal-header"><div><span className="eyebrow session-step">الخطوة 1 من 2 · إعداد الجلسة</span><h2>بدء جلسة جديدة</h2><p><strong>{selectedDevice.name}</strong> · {selectedDevice.room}</p></div><button className="icon-button" onClick={() => setSelectedDevice(null)} aria-label="إغلاق"><X size={18} /></button></div><div className="mode-select"><label>نوع الجلسة</label><div className="mode-buttons"><button className={mode === 'single' ? 'selected' : ''} onClick={() => setMode('single')}><Gamepad2 size={18} /><strong>فردية</strong><span>Single player</span></button><button className={mode === 'multi' ? 'selected' : ''} onClick={() => setMode('multi')}><Users size={18} /><strong>متعددة</strong><span>Multiplayer</span></button></div></div><div className="form-grid"><label>معرّف العميل<input placeholder="مثال: C-10482" /></label><label>المدة<input placeholder="اختر من التسعيرة المعتمدة" /></label></div><div className="modal-note"><ShieldCheck size={16} /> السعر والمدة يحددهما إعداد التسعيرة المعتمد — لا يمكن تعديلهما من حساب الموظف.</div><button className="primary-button" onClick={() => setSelectedDevice(null)}>متابعة بدء الجلسة <ChevronLeft size={16} /></button></div></div>}
    </main>
  )
}

function DevicesView({ onBack, onSelect }: { onBack: () => void; onSelect: (device: Device) => void }) {
  return <div className="inner-page"><button className="back-link" onClick={onBack}><ChevronLeft size={16} /> العودة للرئيسية</button><div className="page-heading compact"><div><p className="eyebrow">التشغيل اليومي · الأجهزة المصرّح بها</p><h1>الأجهزة والجلسات</h1><p className="subheading">اختر جهازاً متاحاً لبدء جلسة وفق التسعيرة المعتمدة.</p></div><span className="secure-label"><ShieldCheck size={15} /> صلاحيات الموظف</span></div><div className="device-groups">{Object.entries(devices.reduce<Record<string, Device[]>>((a, d) => { a[d.room] = [...(a[d.room] || []), d]; return a }, {})).map(([room, items]) => <section className="room-section" key={room}><div className="room-title"><div><h3>{room}</h3><span>{items.length} أجهزة · <b>{items.filter((d) => d.status === 'available').length} متاحة</b></span></div></div><div className="device-grid">{items.map((device) => <button className={`device-card ${device.status}`} key={device.id} disabled={device.status !== 'available'} onClick={() => onSelect(device)}><div className="device-card-top"><span className="device-id">{device.id}</span><span className={`status-label ${device.status}`}><i />{statusLabel(device.status)}</span></div><div className="device-icon"><Gamepad2 size={23} /></div><h4>{device.name}</h4><p>{device.type}</p>{device.status === 'available' ? <span className="start-hint">بدء جلسة فردية أو متعددة <Zap size={14} /></span> : <span className="maintenance-note">{device.status === 'playing' ? 'جلسة قيد التشغيل' : 'غير متاح مؤقتاً'}</span>}</button>)}</div></section>)}</div></div>
}

function ProductsView() {
  const products = [
    { name: 'بيبسي', en: 'Pepsi', icon: CupSoda, tone: 'cola' },
    { name: 'مياه', en: 'Water', icon: CupSoda, tone: 'water' },
    { name: 'فشار', en: 'Popcorn', icon: Popcorn, tone: 'popcorn' },
    { name: 'شيبس', en: 'Chips', icon: Cookie, tone: 'chips' },
    { name: 'وجبة خفيفة', en: 'Snack', icon: Utensils, tone: 'snack' },
  ]
  return <div className="inner-page"><div className="page-heading compact"><div><p className="eyebrow">الطلبات والمنتجات · الأسعار من الكتالوج</p><h1>الطلبات والمنتجات</h1><p className="subheading">اختر منتجاً لإضافته إلى جلسة نشطة. الأسعار والكميات تأتي من النظام.</p></div><span className="secure-label"><ShieldCheck size={15} /> مخزون محمي</span></div><div className="history-toolbar"><div className="search-field"><Search size={17} /><input placeholder="ابحث عن مشروب أو وجبة..." aria-label="بحث المنتجات" /></div><button className="filter-button">كل الفئات <ChevronLeft size={15} /></button><button className="secondary-button add-product-button"><Plus size={16} /> إضافة منتج</button></div><section className="product-catalog" aria-label="كتالوج المنتجات">{products.map(({ name, en, icon: Icon, tone }) => <button className={`product-card ${tone}`} key={en}><span className="product-art"><Icon size={30} strokeWidth={1.8} /></span><span className="product-card-copy"><strong>{name}</strong><small>{en}</small><em>السعر من النظام</em></span><span className="product-add"><Plus size={17} /></span></button>)}</section><div className="notice-bar"><div className="notice-icon"><ShieldCheck size={17} /></div><div><strong>سياق الجلسة مطلوب</strong><p>تتم إضافة الطلبات من بطاقة الغرفة النشطة لضمان تسجيلها على الفاتورة الصحيحة.</p></div></div></div>
}

function PaymentsView() {
  return <div className="inner-page"><div className="page-heading compact"><div><p className="eyebrow">الفواتير والمدفوعات · شيفتي الحالية</p><h1>الفواتير والمدفوعات</h1><p className="subheading">اعرض فقط الفواتير التي تحتاجها أثناء شيفتك وسجّل المدفوعات المصرّح بها.</p></div><span className="secure-label"><ShieldCheck size={15} /> عرض محدود</span></div><section className="panel history-table"><div className="table-row table-head"><span>الفاتورة</span><span>الغرفة</span><span>الإجمالي</span><span>المتبقي</span><span>الحالة</span></div>{[['INV-2041','PS5-04','—','—','قيد التشغيل'],['INV-2038','PS5-07','—','—','بانتظار الدفع']].map((row) => <div className="table-row" key={row[0]}>{row.map((cell, i) => <span key={i} className={i === 4 ? 'table-status' : ''}>{cell}</span>)} </div>)}</section><div className="warning-box"><ShieldCheck size={17} /><span><strong>الأسعار والخصومات محكومة بالنظام</strong><small>لا تظهر تقارير مالية عامة أو بيانات شيفتات موظفين آخرين في مساحة العمل هذه.</small></span></div></div>
}

function statusLabel(status: Device['status']) { return status === 'available' ? 'متاح' : status === 'playing' ? 'قيد التشغيل' : 'صيانة' }

function ShiftView({ onBack }: { onBack: () => void }) { return <div className="inner-page"><button className="back-link" onClick={onBack}><ChevronLeft size={16} /> العودة للتشغيل</button><div className="page-heading compact"><div><p className="eyebrow">شيفتي · الثلاثاء 24 سبتمبر</p><h1>الوردية الصباحية</h1><p className="subheading">09:00 — 17:00 · فرع النخيل · نقطة البيع الرئيسية</p></div><span className="shift-status"><i /> جارية الآن</span></div><div className="shift-stats"><div><Clock3 size={18} /><span>الوقت المنقضي</span><strong>01:46:22</strong></div><div><WalletCards size={18} /><span>إجمالي المقبوضات</span><strong>1,248.00 <small>ر.س</small></strong></div><div><CheckCircle2 size={18} /><span>حالة الصندوق</span><strong className="green-text">مطابق حتى الآن</strong></div></div><div className="shift-layout"><section className="panel checklist"><div className="panel-heading"><div><h2>قائمة إغلاق الشيفت</h2><p>أكمل الخطوات قبل طلب التسليم</p></div><span className="progress-count">2 / 4</span></div>{['مطابقة رصيد الصندوق مع العمليات', 'مراجعة الجلسات المفتوحة', 'تسليم المفاتيح والأجهزة', 'إرسال ملخص الشيفت للموظف التالي'].map((item, i) => <label className={`check-row ${i < 2 ? 'done' : ''}`} key={item}><input type="checkbox" defaultChecked={i < 2} /><span className="check-box"><Check size={14} /></span><span><strong>{item}</strong><small>{i === 0 ? 'آخر مطابقة منذ 12 دقيقة' : i === 1 ? 'لا توجد جلسات متأخرة' : 'بانتظار التنفيذ'}</small></span></label>)}<div className="warning-box"><ShieldCheck size={17} /><span><strong>لا يوجد اعتماد تلقائي</strong><small>في حال وجود فرق في الصندوق، سيبقى الإغلاق معلقاً لحين المراجعة حسب سياسة الاعتماد.</small></span></div><button className="primary-button wide">طلب إغلاق وتسليم الشيفت <ChevronLeft size={16} /></button></section><section className="panel"><div className="panel-heading"><div><h2>خط زمني للشيفت</h2><p>كل الأحداث المسجلة</p></div></div><div className="timeline detailed">{timeline.concat([{ time: '09:04', title: 'فتح نقطة البيع', detail: 'POS-01 · بداية الشيفت', tone: 'blue' }]).map((event) => <div className="timeline-item" key={event.time + event.title}><span className={`timeline-dot ${event.tone}`} /><time>{event.time}</time><div><strong>{event.title}</strong><p>{event.detail}</p></div></div>)}</div></section></div></div> }

function MessagesView({ message, setMessage, sentMessages, sendMessage }: { message: string; setMessage: (v: string) => void; sentMessages: string[]; sendMessage: () => void }) { return <div className="inner-page"><div className="page-heading compact"><div><p className="eyebrow">التسليم والاستلام · محفوظة على النظام</p><h1>مركز التسليم</h1><p className="subheading">رسائل الشيفتات المرتبطة بنقطة عملك — تظهر للموظف المعيّن التالي فقط.</p></div><span className="secure-label"><ShieldCheck size={15} /> محمي بالصلاحيات</span></div><div className="messages-layout"><section className="panel conversation"><div className="conversation-head"><div className="avatar small">س</div><div><strong>تسليم الشيفت السابق</strong><p>سلمان الحربي · 09:00 اليوم</p></div><span className="ack-label">بانتظار تأكيدك</span></div><div className="message-thread"><div className="bubble received"><p>تمت مراجعة الصندوق حتى 09:00. كل شيء مطابق. العميل على PS5-07 سيعود 11:30 لاستكمال الجلسة.</p><time>09:02 · مستلم</time></div>{sentMessages.map((item, i) => <div className="bubble sent" key={i}><p>{item}</p><time>الآن · تم الحفظ</time></div>)}</div><div className="compose"><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) sendMessage() }} placeholder="اكتب ملاحظة للتسليم التالي..." aria-label="رسالة جديدة" /><button onClick={sendMessage} aria-label="إرسال الرسالة"><Send size={17} /></button></div></section><section className="panel handover-info"><h2>حالة التسليم</h2><div className="handover-state"><CheckCircle2 size={19} /><div><strong>رسالة سابقة متاحة</strong><p>يجب تأكيد الاستلام قبل إنهاء الشيفت.</p></div></div><button className="secondary-button">تأكيد الاستلام <Check size={16} /></button><div className="privacy-note"><ShieldCheck size={16} /><p>تظهر هذه المحادثة للشيفت المعيّن لنقطة البيع فقط. الرسائل تحفظ في النظام ولا تعتمد على جهازك.</p></div></section></div></div> }

function HistoryView() { return <div className="inner-page"><div className="page-heading compact"><div><p className="eyebrow">سجل النشاط · نورة العتيبي</p><h1>سجل نشاطي</h1><p className="subheading">عملياتك المصرّح بها فقط، مع معرّف ووقت لكل حدث.</p></div><button className="secondary-button"><History size={16} /> تصدير السجل</button></div><div className="history-toolbar"><div className="search-field"><Search size={17} /><input placeholder="ابحث بالمعرّف أو نوع العملية" /></div><button className="filter-button">كل العمليات <ChevronLeft size={15} /></button><button className="filter-button">آخر 7 أيام <ChevronLeft size={15} /></button></div><section className="panel history-table"><div className="table-row table-head"><span>الوقت</span><span>العملية</span><span>المعرّف</span><span>الحالة</span><span /></div>{[['اليوم · 10:42','بدء جلسة فردية','PS5-04 · #S-2041','مكتملة'],['اليوم · 10:16','استلام نقدية','TX-10482','مكتملة'],['اليوم · 09:58','تسجيل دخول الشيفت','SHIFT-0924','مكتملة'],['أمس · 16:44','إضافة ملاحظة تسليم','HO-2817','محفوظة']].map((row) => <div className="table-row" key={row[2]}>{row.map((cell, i) => <span key={cell} className={i === 3 ? 'table-status' : ''}>{cell}</span>)}<MoreHorizontal size={17} /></div>)}</section></div> }
