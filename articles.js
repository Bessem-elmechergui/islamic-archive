<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>قراءة المقال - الأرشيف العلمي للشيخين كمال المرزوقي وقيس الخياري</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Cairo', sans-serif; background-color: #f9f9f9; color: #333; line-height: 1.9; }
        header { background-color: #ffffff; border-bottom: 1px solid #eaeaea; padding: 20px; text-align: center; }
        header h1 { font-size: 24px; color: #1a365d; margin-bottom: 5px; }
        header p { color: #666; font-size: 14px; margin-bottom: 12px; }
        nav { background-color: #1a365d; display: flex; justify-content: center; flex-wrap: wrap; padding: 10px; }
        nav a { color: #ffffff; text-decoration: none; padding: 8px 15px; font-size: 14px; transition: 0.3s; }
        nav a:hover { color: #cbd5e1; }
        .container { max-width: 850px; margin: 35px auto; padding: 0 20px; }
        .article-box { background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); border-right: 4px solid #b7791f; }
        .article-title { font-size: 24px; color: #1a365d; margin-bottom: 12px; line-height: 1.5; }
        .article-meta { font-size: 14px; color: #4a5568; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #edf2f7; display: flex; flex-wrap: wrap; gap: 15px; }
        .article-content p { margin-bottom: 16px; font-size: 16px; color: #2d3748; }
        .back-btn { display: inline-block; margin-top: 25px; background-color: #b7791f; color: #fff; padding: 8px 18px; border-radius: 4px; text-decoration: none; font-size: 14px; transition: 0.3s; }
        .back-btn:hover { background-color: #975a16; }
        .not-found { text-align: center; padding: 30px 10px; color: #4a5568; }
    </style>
</head>
<body>

    <header>
        <h1>الأرشيف العلمي للشيخين كمال المرزوقي وقيس الخياري</h1>
        <p>قسم المقالات والبحوث العلمية</p>
    </header>

    <nav>
        <a href="index.html">الرئيسية</a>
        <a href="about.html">عن الشيخين</a>
        <a href="articles.html" style="color: #cbd5e1; font-weight: bold;">المقالات</a>
        <a href="books.html">الكتب والبحوث</a>
        <a href="lectures.html">المحاضرات والدروس</a>
        <a href="fatwas.html">الفتاوى</a>
    </nav>

    <div class="container">
        <div class="article-box" id="articleContainer">
            <div class="not-found">جاري تحميل المقال...</div>
        </div>
    </div>

    <script src="articles.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", async function () {
            const container = document.getElementById("articleContainer");
            const params = new URLSearchParams(window.location.search);
            const articleId = params.get("id");

            if (!articleId) {
                showNotFound("لم يتم تحديد مقال للقراءة.");
                return;
            }

            const metaFromIndex = (typeof allArticles !== "undefined")
                ? allArticles.find(item => item.id === articleId)
                : null;

            try {
                const response = await fetch(`data/articles/${encodeURIComponent(articleId)}.json`);
                if (!response.ok) {
                    throw new Error("ملف المقال غير موجود");
                }

                const articleData = await response.json();
                const title = articleData.title || (metaFromIndex && metaFromIndex.title) || "مقال علمي";
                const author = articleData.author || (metaFromIndex && metaFromIndex.author) || "";
                const date = articleData.date || (metaFromIndex && metaFromIndex.date) || "";
                const content = articleData.content || "";

                document.title = title + " - المقالات";
                container.innerHTML = `
                    <h2 class="article-title">${title}</h2>
                    <div class="article-meta">
                        ${author ? `<span><strong>الكاتب:</strong> ${author}</span>` : ""}
                        ${date ? `<span><strong>التاريخ:</strong> ${date}</span>` : ""}
                    </div>
                    <div class="article-content">
                        ${content}
                    </div>
                    <a href="articles.html" class="back-btn">العودة إلى المقالات</a>
                `;
            } catch (err) {
                showNotFound("تعذر تحميل نص هذا المقال، قد يكون ملفه غير منشور بعد.");
            }

            function showNotFound(message) {
                container.innerHTML = `
                    <div class="not-found">
                        <h3>المقال المطلوب غير متوفر</h3>
                        <p>${message}</p>
                        <a href="articles.html" class="back-btn">العودة إلى المقالات</a>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>
    
