document.getElementById("analyzeBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput").files[0];
    const resultBox = document.getElementById("resultBox");

    if (!fileInput) {
        resultBox.innerHTML = "ファイルを選択してください。";
        return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
        const text = reader.result;

        // シンプルなキーワード診断（例）
        let score = 0;
        let advice = [];

        if (text.includes("手作業") || text.includes("紙")) {
            score += 2;
            advice.push("まずは紙・手作業のプロセスをデジタル化しましょう。");
        }
        if (text.includes("共有できない") || text.includes("情報が散乱")) {
            score += 2;
            advice.push("情報共有ツールの導入を検討してください。");
        }
        if (text.includes("人手不足") || text.includes("効率")) {
            score += 1;
            advice.push("業務効率化ツール（自動化）の導入が効果的です。");
        }

        // 診断結果が何も無ければ
        if (advice.length === 0) {
            advice.push("特筆すべき課題は検出されませんでした。");
        }

        resultBox.innerHTML = `
            <p><strong>診断スコア：</strong> ${score}</p>
            <p><strong>アドバイス：</strong></p>
            <ul>
                ${advice.map(a => `<li>${a}</li>`).join("")}
            </ul>
        `;
    };

    reader.readAsText(fileInput);
});
