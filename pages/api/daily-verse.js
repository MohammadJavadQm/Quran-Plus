import verses from '../../lib/verses-data.json';

export default function handler(req, res) {
  // تاریخ امروز رو می‌گیریم
  const today = new Date();
  // روز سال رو محاسبه می‌کنیم (از ۱ تا ۳۶۵)
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  // یک اندیس ثابت بر اساس روز سال و تعداد آیات تولید می‌کنیم
  const index = dayOfYear % verses.length;
  
  const dailyVerse = verses[index];

  if (dailyVerse) {
    res.status(200).json(dailyVerse);
  } else {
    res.status(404).json({ error: 'Verse not found' });
  }
}