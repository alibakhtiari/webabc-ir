interface Env { }

export const onRequest: PagesFunction<Env> = async (context) => {
    const url = new URL(context.request.url);

    // 1. Redirect WWW to non-WWW
    if (url.hostname.startsWith("www.")) {
        url.hostname = url.hostname.replace("www.", "");
        return Response.redirect(url.toString(), 301);
    }

    // 2. Language Redirect (Root path only)
    if (url.pathname === "/") {
        const country = (context.request.cf?.country as string) || "US";

        // Persian Countries
        const persianCountries = ["IR", "AF", "TJ"];

        // Arabic Countries (Common list)
        const arabicCountries = [
            "SA", "AE", "QA", "KW", "BH", "OM",
            "IQ", "EG", "LB", "JO", "SY", "YE",
            "PS", "SD", "LY", "MA", "DZ", "TN", "MR"
        ];

        if (persianCountries.includes(country)) {
            return Response.redirect(`${url.origin}/fa`, 307);
        } else if (arabicCountries.includes(country)) {
            return Response.redirect(`${url.origin}/ar`, 307);
        } else {
            // Default to English
            return Response.redirect(`${url.origin}/en`, 307);
        }
    }

    return context.next();
};
