import quranData from '../../lib/verses-data.json';

export default async function handler(req, res) {
  // انتخاب آیه پیش‌فرض از JSON داخلی
  const randomIndex = Math.floor(Math.random() * quranData.length);
  let verse = quranData[randomIndex];

  try {
    // تلاش برای گرفتن آیه واقعی از API
    const apiUrl = `https://api.quran.com/api/v4/verses/by_key/${verse.suraNumber}:${verse.ayaNumber}?fields=text_uthmani,audio&translations=131`;
    const response = await fetch(apiUrl, { headers: { Accept: "application/json" } });

    if (response.ok) {
      const data = await response.json();
      const verseData = data.verse;

      // گرفتن نام سوره از API
      const surahRes = await fetch(`https://api.quran.com/api/v4/chapters/${verse.suraNumber}?language=fa`);
      const surahData = surahRes.ok ? await surahRes.json() : null;

      verse = {
        ayaText: verseData.text_uthmani || verse.ayaText,
        translation: verseData.translations[0]?.text || verse.translation,
        ayaNumber: verseData.verse_number || verse.ayaNumber,
        suraName: surahData?.chapter.name_simple || verse.suraName,
        suraArabicName: surahData?.chapter.name_arabic || verse.suraName,
        tafsir: "تفسیر در دسترس نیست.",
        audio: verseData.audio?.[0]?.url || null
      };
    }
  } catch (err) {
    console.error("API fetch failed, using JSON verse:", err);
    // در صورت خطا، همان آیه JSON داخلی استفاده می‌شود
  }

  res.status(200).json(verse);
}
