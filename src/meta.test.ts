import { describe, it, expect, vi } from 'vitest';
import { parseMeta } from './meta';

describe('parseMeta', () => {
	it('should return metadata when the URL is valid', async () => {
		const url = 'https://example.com';
		const html = `
      <html>
        <head>
          <title>Example Title</title>
          <meta name="description" content="Example description">
          <link rel="icon" href="/favicon.ico">
        </head>
      </html>
    `;

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			text: vi.fn().mockResolvedValue(html),
		});

		const result = await parseMeta(url);

		expect(result).toEqual({
			result: {
				title: 'Example Title',
				meta: {
					description: 'Example description',
				},
				favicons: ['https://example.com/favicon.ico'],
			},
			error: null,
		});
	});

	it('should return an error when the URL fetch fails', async () => {
		const url = 'https://example.com';

		global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

		const result = await parseMeta(url);

		expect(result).toEqual({
			result: null,
			error: 'Failed to fetch the URL',
		});
	});

	it('should return an error when the response is not ok', async () => {
		const url = 'https://example.com';

		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
		});

		const result = await parseMeta(url);

		expect(result).toEqual({
			result: null,
			error: 'Failed to fetch the URL',
		});
	});

	it('should return correct title in mierune.co.jp', async () => {
		const url = 'https://mierune.co.jp';
		const html = `
			<!doctype html>
<html lang="ja">
    <head>
        <meta charset="utf-8"/>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="icon" href="/favicon.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Hanken+Grotesk:wght@300;500;600;700&display=swap" rel="stylesheet"/>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NQ5RSZBQL5"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-NQ5RSZBQL5');
        </script>
        <link href="./_app/immutable/assets/0.ziHz2nn3.css" rel="stylesheet">
        <!--[-->
        <meta name="description" content="株式会社MIERUNEは、北海道で生まれた位置情報技術のプロフェッショナル集団です。">
        <meta property="og:title" content="株式会社MIERUNE - 位置から、価値へ。">
        <meta property="og:site_name" content="株式会社MIERUNE">
        <meta property="og:url" content="https://mierune.co.jp/">
        <meta property="og:description" content="株式会社MIERUNEは、北海道で生まれた位置情報技術のプロフェッショナル集団です。">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="ja_JP">
        <meta property="og:image" content="https://www.mierune.co.jp/ogp.webp">
        <meta name="twitter:card" content="summary_large_image">
        <!--[!-->
        <!--]-->
        <!--]-->
        <title>株式会社MIERUNE - 位置から、価値へ。</title>
    </head>
    <body data-sveltekit-preload-data="hover" class="overflow-x-hidden">
        <div style="display: contents">
            <!--[-->
            <!--[-->
            <!---->
            <header class="z-10 mx-auto max-w-7xl py-4 pr-6 pl-5">
                <div class="flex items-center justify-between gap-6">
                    <a href="/" class="transition duration-500 hover:opacity-75">
                        <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.2 92.5" role="img" class="h-auto text-[#005773] w-[161.4px]">
                            <title>MIERUNE</title>
                            <g>
                                <path fill="currentColor" d="M59.4,65.4c-4.2-.2-8.5-.3-12.7-.3s-8.5,0-12.7.3c-1.2,0-2.3,0-3.5.2.2-2.6.4-5.1.5-7.7.1-2.7.2-5.4.3-8.2v-7.2c0-2.7-.1-5.4-.3-8.2-.1-2.6-.3-5.1-.5-7.7-.2-2.7-.5-5.5-.8-8.2-2.8-.2-5.5-.4-8.3-.7.3,2.8.6,5.5.8,8.3.6,6.7.8,13.4.8,20.1s-.3,13.4-.8,20.1c-.1,1-.2,1.9-.3,2.9-.2,1.8-.4,3.6-.6,5.4,2.8-.3,5.5-.5,8.3-.7,5.7-.4,11.4-.6,17-.6s9,0,13.5.4c-.3-2.6-.5-5.2-.7-7.7v-.5"></path>
                                <path fill="currentColor" d="M70.3,46.2c0-6.6.3-13.4.8-20.1,0-1,.2-1.9.3-2.9.2-1.8.3-3.6.6-5.4-2.8.3-5.5.5-8.3.7-5.7.4-11.4.6-17,.6s-9-.1-13.5-.4c.3,2.6.5,5.2.7,7.7v.5c4.2.2,8.5.3,12.7.3s8.5-.1,12.7-.3c1.2-.1,2.3-.1,3.5-.2-.2,2.6-.4,5.1-.5,7.7h-27.9c0,2.7.2,5.4.2,8.1h27.6v7.2h-27.5c0,2.8,0,5.5-.2,8.2h28c0,2.6.3,5.1.5,7.7.2,2.7.5,5.5.8,8.2,2.8.2,5.5.4,8.3.7-.3-2.8-.6-5.5-.8-8.3-.7-6.7-1-13.4-1-20.1"></path>
                                <path fill="currentColor" d="M208.7,52.7c-.5,1-1.1,1.8-1.8,2.5-.8.7-1.7,1.2-2.7,1.6-1,.4-2.1.6-3.3.6s-2.3-.2-3.3-.6c-1-.4-1.9-.9-2.7-1.6-.8-.7-1.4-1.5-1.8-2.5-.4-1-.7-2.1-.7-3.3v-14.9h5.5v14.7c0,1,.3,1.9.8,2.4.5.6,1.2.8,2.2.8s1.7-.3,2.2-.8c.5-.6.8-1.4.8-2.4v-14.7h5.5v14.8c0,1.3-.2,2.4-.7,3.4"></path>
                                <path fill="currentColor" d="M115.4,34.5h-6l-5,9.9-5-9.9h-6c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.1v-10.7l3.2,5.5h3.5l3.2-5.5v10.7h6.1c-.5-3.7-.8-7.4-.8-11.2-.2-3.8,0-7.5.7-11.2"></path>
                                <path fill="currentColor" d="M131.5,34.5h-6.9c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.9c-.5-3.7-.8-7.4-.8-11.2s.3-7.5.8-11.2"></path>
                                <path fill="currentColor" d="M141.6,45.7c0,3.8-.3,7.5-.8,11.2h15.8v-4.9h-9.7v-3.9h8.3v-4.9h-8.3v-3.7h9.7v-4.9h-15.8c.5,3.6.8,7.3.8,11.1"></path>
                                <path fill="currentColor" d="M180.6,46.8c.4-.4.8-.8,1.2-1.3.3-.5.6-1,.9-1.7.2-.6.3-1.3.3-2.1s-.2-1.8-.5-2.7-.8-1.6-1.5-2.3c-.6-.7-1.4-1.2-2.4-1.6s-2.1-.6-3.3-.6h-9.4c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.1v-8.3h1.9l4,8.3h6.4l-4.8-9.3c.2-.2.7-.5,1.1-.8M176.8,43.3c-.4.5-1,.7-1.8.7h-3.1v-4.5h3.1c.8,0,1.3.2,1.8.7.4.5.6,1,.6,1.6s-.2,1-.6,1.5"></path>
                                <path fill="currentColor" d="M237.3,34.5h-6.1v11.3l-7.2-11.3h-5.4c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.1v-11.2l7.2,11.3h5.4c-.5-3.7-.8-7.4-.8-11.2s.2-7.6.8-11.3"></path>
                                <path fill="currentColor" d="M262.4,39.5v-4.9h-15.8c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h15.8v-4.9h-9.7v-3.9h8.3v-4.9h-8.3v-3.7h9.7Z"></path>
                            </g>
                        </svg>
                        <!---->
                    </a>
                    <nav class="hidden w-full max-w-xl flex-1 md:block">
                        <ul class="flex w-full justify-around gap-6">
                            <!--[-->
                            <li class="relative pl-4 before:absolute before:top-1/2 before:left-0 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-transparent before:content-[''] data-active:before:bg-black">
                                <a href="/about" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">About</a>
                            </li>
                            <li class="relative pl-4 before:absolute before:top-1/2 before:left-0 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-transparent before:content-[''] data-active:before:bg-black">
                                <a href="/business" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">Business</a>
                            </li>
                            <li class="relative pl-4 before:absolute before:top-1/2 before:left-0 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-transparent before:content-[''] data-active:before:bg-black">
                                <a href="/community" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">Community</a>
                            </li>
                            <!--]-->
                        </ul>
                    </nav>
                    <div class="hidden items-center gap-6 md:flex">
                        <a href="https://welcome.mierune.co.jp/" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-1.5 rounded-full bg-mierune-blue px-4 py-1.5 text-white transition duration-300 ease-in-out hover:opacity-75">
                            <span class="text-nowrap break-keep">Dev / Careers</span>
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="h-4 w-4 -rotate-45 group-hover:animate-arrow-right-top">
                                <!--[!-->
                                <!--]-->
                                <!--[-->
                                <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                            </svg>
                            <!---->
                        </a>
                    </div>
                    <div class="flex items-center md:hidden">
                        <button class="relative cursor-pointer pl-4 transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75 data-active:underline before:absolute before:top-1/2 before:left-0 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-black before:content-['']">Menu</button>
                        <!--[!-->
                        <!--]-->
                        <!---->
                    </div>
                </div>
            </header>
            <!---->
            <div class="min-h-[calc(100vh-310px)] w-full sm:min-h-[calc(100vh-215px)]">
                <!---->
                <!---->
                <section class="relative">
                    <div class="absolute -top-72 right-0 bottom-0 left-0 -z-10 w-full">
                        <picture>
                            <source srcset="/_app/immutable/assets/top-hero.DW6-yscR.avif 1x, /_app/immutable/assets/top-hero.DLWZeTS9.avif 2x" type="image/avif">
                            <source srcset="/_app/immutable/assets/top-hero.BmiqDC9u.webp 1x, /_app/immutable/assets/top-hero.2SiRJ66z.webp 2x" type="image/webp">
                            <source srcset="/_app/immutable/assets/top-hero.Dk1Gjgw4.png 1x, /_app/immutable/assets/top-hero.CrTMr4p6.png 2x" type="image/png">
                            <img src="/_app/immutable/assets/top-hero.CrTMr4p6.png" alt="Sapporo - OpenStreetMap" class="h-full w-full object-cover" width="2560" height="2160">
                        </picture>
                    </div>
                    <div class="px-hero mx-auto container-hero mb-12 w-full pt-24 pb-32 sm:py-24">
                        <div class="flex flex-col text-left">
                            <div class="text-sp-hero-mission-en sm:text-hero-mission-en">
                                Geospatial for <br class="block sm:hidden">Greater Good.
                            </div>
                            <h1 class="text-sp-hero-mission-jp palt sm:text-hero-mission-jp">
                                位置から、<br class="block sm:hidden">価値へ。
                            </h1>
                        </div>
                        <div class="mt-22">
                            <p class="text-sp-hero-copy palt sm:text-hero-copy">
                                位置には、まだ見ぬ<br>可能性が眠っているはずだ。
                            </p>
                        </div>
                        <div class="mt-6">
                            <a href="/about" class="group relative inline-flex w-fit items-center gap-4 rounded-full border border-mierune-black bg-transparent px-16 py-4 text-mierune-black transition-color duration-300 ease-in-out hover:bg-mierune-black hover:text-mierune-white" target="_self">
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="absolute left-7 h-4 w-4 group-hover:animate-arrow-right">
                                    <!--[!-->
                                    <!--]-->
                                    <!--[-->
                                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                </svg>
                                <!---->
                                <span class="whitespace-nowrap">私たちについて</span>
                            </a>
                            <!---->
                        </div>
                    </div>
                    <p class="absolute right-2.5 bottom-1 text-sm text-mierune-dark">© OpenStreetMap Contributors</p>
                </section>
                <!---->
                <section class="container mx-auto mt-20 mb-12">
                    <div class="mb-8">
                        <h2 class="heading-dot-mierune-gray text-heading-3">News</h2>
                        <p class="mt-2 text-subheading-3">ニュース</p>
                    </div>
                    <div class="relative font-sans">
                        <!--[-->
                        <div class="group grid grid-cols-[16px_1fr] grid-rows-[auto-1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[auto_16px_1fr] sm:grid-rows-1">
                            <time class="col-start-2 col-end-3 row-start-1 row-end-2 text-mierune-dark sm:col-start-1 sm:col-end-2 sm:row-auto" datetime="2025-06-02T08:16:48.578Z">2025.06.02</time>
                            <div class="relative col-start-1 col-end-2 row-start-1 row-end-3 flex h-full items-start justify-center py-0.5 sm:col-start-2 sm:col-end-3 sm:row-auto sm:py-4">
                                <div class="absolute left-1/2 h-full w-[4px] -translate-x-1/2 bg-mierune-gray group-last:h-[calc(100%+20px)] group-last:bg-linear-to-b group-last:from-mierune-gray group-last:to-white"></div>
                                <div class="z-10 grid place-items-center rounded-full bg-white p-[3px]">
                                    <div class="h-[12px] w-[12px] rounded-full bg-news-release"></div>
                                </div>
                            </div>
                            <div class="col-start-2 col-end-3 row-start-2 row-end-3 pb-2 sm:col-start-3 sm:col-end-4 sm:row-auto sm:pb-0">
                                <a href="/news/a5z6hll9eskp" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">
                                    <div>東京拠点移転のお知らせ</div>
                                </a>
                            </div>
                        </div>
                        <div class="group grid grid-cols-[16px_1fr] grid-rows-[auto-1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[auto_16px_1fr] sm:grid-rows-1">
                            <time class="col-start-2 col-end-3 row-start-1 row-end-2 text-mierune-dark sm:col-start-1 sm:col-end-2 sm:row-auto" datetime="2025-04-02T01:07:42.180Z">2025.04.02</time>
                            <div class="relative col-start-1 col-end-2 row-start-1 row-end-3 flex h-full items-start justify-center py-0.5 sm:col-start-2 sm:col-end-3 sm:row-auto sm:py-4">
                                <div class="absolute left-1/2 h-full w-[4px] -translate-x-1/2 bg-mierune-gray group-last:h-[calc(100%+20px)] group-last:bg-linear-to-b group-last:from-mierune-gray group-last:to-white"></div>
                                <div class="z-10 grid place-items-center rounded-full bg-white p-[3px]">
                                    <div class="h-[12px] w-[12px] rounded-full bg-news-release"></div>
                                </div>
                            </div>
                            <div class="col-start-2 col-end-3 row-start-2 row-end-3 pb-2 sm:col-start-3 sm:col-end-4 sm:row-auto sm:pb-0">
                                <a href="/news/ke0b3-gen5" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">
                                    <div>エヴァンジェリスト古川が地理空間情報課ラボのスペシャルサポーターに就任しました</div>
                                </a>
                            </div>
                        </div>
                        <div class="group grid grid-cols-[16px_1fr] grid-rows-[auto-1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[auto_16px_1fr] sm:grid-rows-1">
                            <time class="col-start-2 col-end-3 row-start-1 row-end-2 text-mierune-dark sm:col-start-1 sm:col-end-2 sm:row-auto" datetime="2025-03-25T12:30:00.000Z">2025.03.25</time>
                            <div class="relative col-start-1 col-end-2 row-start-1 row-end-3 flex h-full items-start justify-center py-0.5 sm:col-start-2 sm:col-end-3 sm:row-auto sm:py-4">
                                <div class="absolute left-1/2 h-full w-[4px] -translate-x-1/2 bg-mierune-gray group-last:h-[calc(100%+20px)] group-last:bg-linear-to-b group-last:from-mierune-gray group-last:to-white"></div>
                                <div class="z-10 grid place-items-center rounded-full bg-white p-[3px]">
                                    <div class="h-[12px] w-[12px] rounded-full bg-news-article"></div>
                                </div>
                            </div>
                            <div class="col-start-2 col-end-3 row-start-2 row-end-3 pb-2 sm:col-start-3 sm:col-end-4 sm:row-auto sm:pb-0">
                                <a href="/news/yskkc8z8pjor" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">
                                    <div>iPhoneでもAndroidでも試せる 無償の3Dスキャン・アプリScanivers（Interface 2025年5月号）</div>
                                </a>
                            </div>
                        </div>
                        <div class="group grid grid-cols-[16px_1fr] grid-rows-[auto-1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[auto_16px_1fr] sm:grid-rows-1">
                            <time class="col-start-2 col-end-3 row-start-1 row-end-2 text-mierune-dark sm:col-start-1 sm:col-end-2 sm:row-auto" datetime="2025-03-03T12:29:38.000Z">2025.03.03</time>
                            <div class="relative col-start-1 col-end-2 row-start-1 row-end-3 flex h-full items-start justify-center py-0.5 sm:col-start-2 sm:col-end-3 sm:row-auto sm:py-4">
                                <div class="absolute left-1/2 h-full w-[4px] -translate-x-1/2 bg-mierune-gray group-last:h-[calc(100%+20px)] group-last:bg-linear-to-b group-last:from-mierune-gray group-last:to-white"></div>
                                <div class="z-10 grid place-items-center rounded-full bg-white p-[3px]">
                                    <div class="h-[12px] w-[12px] rounded-full bg-news-article"></div>
                                </div>
                            </div>
                            <div class="col-start-2 col-end-3 row-start-2 row-end-3 pb-2 sm:col-start-3 sm:col-end-4 sm:row-auto sm:pb-0">
                                <a href="/news/z76kzkuo6" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">
                                    <div>Amazon Location Service の新機能を QGIS で利用する（builders.flash コミュニティ通信）</div>
                                </a>
                            </div>
                        </div>
                        <div class="group grid grid-cols-[16px_1fr] grid-rows-[auto-1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[auto_16px_1fr] sm:grid-rows-1">
                            <time class="col-start-2 col-end-3 row-start-1 row-end-2 text-mierune-dark sm:col-start-1 sm:col-end-2 sm:row-auto" datetime="2025-02-14T09:25:01.758Z">2025.02.14</time>
                            <div class="relative col-start-1 col-end-2 row-start-1 row-end-3 flex h-full items-start justify-center py-0.5 sm:col-start-2 sm:col-end-3 sm:row-auto sm:py-4">
                                <div class="absolute left-1/2 h-full w-[4px] -translate-x-1/2 bg-mierune-gray group-last:h-[calc(100%+20px)] group-last:bg-linear-to-b group-last:from-mierune-gray group-last:to-white"></div>
                                <div class="z-10 grid place-items-center rounded-full bg-white p-[3px]">
                                    <div class="h-[12px] w-[12px] rounded-full bg-news-release"></div>
                                </div>
                            </div>
                            <div class="col-start-2 col-end-3 row-start-2 row-end-3 pb-2 sm:col-start-3 sm:col-end-4 sm:row-auto sm:pb-0">
                                <a href="/news/6cor_jizbm" class="transition-opacity duration-300 ease-in-out hover:underline hover:opacity-75">
                                    <div>QGISの「Large Sustaining Member」に就任しました</div>
                                </a>
                            </div>
                        </div>
                        <!--]-->
                    </div>
                    <div class="text-sm">
                        <a href="/news" class="group mx-auto flex w-fit items-center gap-4 border-b border-mierune-black py-2 pr-7 pl-2 transition duration-300 ease-in-out hover:opacity-75 sm:py-3 sm:pr-10 sm:pl-6" target="_self">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="h-4 w-4 transition-transform duration-300 group-hover:rotate-180">
                                <!--[!-->
                                <!--]-->
                                <!--[-->
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"></path>
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                            </svg>
                            <!---->
                            <span>もっと見る</span>
                        </a>
                    </div>
                    <!---->
                </section>
                <!---->
                <section class="mt-24">
                    <div class="container">
                        <div class="my-8 flex flex-col gap-1 sm:gap-0">
                            <h2 class="heading-dot-page-business text-sp-heading-2 sm:text-heading-2">Business</h2>
                            <div class="text-sp-subheading-2 sm:text-subheading-2">事業内容</div>
                        </div>
                        <div class="flex flex-col items-start justify-between gap-8 sm:flex-row sm:gap-12">
                            <div class="text-description">
                                <p>わたしたちは、位置情報技術のプロフェッショナル集団です。</p>
                                <p>ソリューション開発・QGIS・コンサルティングなどを通じて、「位置」の力を「価値」に変え、お客様の課題解決をサポートします。</p>
                            </div>
                            <a href="/business" class="group relative inline-flex w-fit items-center gap-4 rounded-full border border-mierune-black bg-transparent px-16 py-4 text-mierune-black transition-color duration-300 ease-in-out hover:bg-mierune-black hover:text-mierune-white" target="_self">
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="absolute left-7 h-4 w-4 group-hover:animate-arrow-right">
                                    <!--[!-->
                                    <!--]-->
                                    <!--[-->
                                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                    <!--[-->
                                    <!--]-->
                                </svg>
                                <!---->
                                <span class="whitespace-nowrap">もっと見る</span>
                            </a>
                            <!---->
                        </div>
                    </div>
                    <div class="relative overflow-hidden mt-10 sm:mt-10">
                        <div class="flex">
                            <!--[-->
                            <a href="/works/sdb32oima" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/f116e1efea114a3ba33e436b796adae2/jirei-jaxa-sama.webp?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="JAXA提供データを数クリックでQGISに！の画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-sdb32oima">
                                </div>
                                <div>
                                    <p class="text-base">宇宙航空研究開発機構（JAXA）様</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">JAXA提供データを数クリックでQGISに！</p>
                                </div>
                            </a>
                            <a href="/works/q10ft1tjc4" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/191f60d2e58a4c2b8cf7c0523ac23051/jirei-qgis-support.jpg?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="MIERUNEのQGIS研修 〜450人以上が受講した⁨開発チーム公認の講習会〜の画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-q10ft1tjc4">
                                </div>
                                <div>
                                    <p class="text-base">自社</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">MIERUNEのQGIS研修 〜450人以上が受講した⁨開発チーム公認の講習会〜</p>
                                </div>
                            </a>
                            <a href="/works/qtg527xkwv" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/ac0bbdfefb42417799f5ca97f8d8ef39/jirei-gtfs-go.webp?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="全世界で使われる公共交通可視化プラグイン「GTFS-GO」の画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-qtg527xkwv">
                                </div>
                                <div>
                                    <p class="text-base">自社</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">全世界で使われる公共交通可視化プラグイン「GTFS-GO」</p>
                                </div>
                            </a>
                            <a href="/works/mg6t-g0jkw" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/cc6387220777463ab347a27e7f966ff8/jirei-morizon.png?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="QGIS上で収益性と災害リスクを考慮した森林ゾーニングを可能にの画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-mg6t-g0jkw">
                                </div>
                                <div>
                                    <p class="text-base">一般社団法人 日本森林技術協会 様</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">QGIS上で収益性と災害リスクを考慮した森林ゾーニングを可能に</p>
                                </div>
                            </a>
                            <a href="/works/c_pygqrasz" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/0378bb3c94744c529bcdd0d8a8a30da7/jirei-support.jpg?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="QGISを安心してご利用いただける 「QGIS 商用サポート」の画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-c_pygqrasz">
                                </div>
                                <div>
                                    <p class="text-base">自社</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">QGISを安心してご利用いただける 「QGIS 商用サポート」</p>
                                </div>
                            </a>
                            <a href="/works/w4ul1s2qwrq" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/911ab4d13b10401cb5a6248de3a46ebe/qgis-lab-top-new-slogan.png?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="日本初！QGISに特化した総合情報メディア「QGIS LAB by MIERUNE」開設の画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-w4ul1s2qwrq">
                                </div>
                                <div>
                                    <p class="text-base">自社</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">日本初！QGISに特化した総合情報メディア「QGIS LAB by MIERUNE」開設</p>
                                </div>
                            </a>
                            <a href="/works/saj834xpwanf" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/2c8c26e8b3b74a90ba66f98d2bc05745/jirei-mlit-sama-nusamai.png?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="CityGML形式の3DモデルをGISデータに変換する変換ツールを開発の画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-saj834xpwanf">
                                </div>
                                <div>
                                    <p class="text-base">国土交通省 様</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">CityGML形式の3DモデルをGISデータに変換する変換ツールを開発</p>
                                </div>
                            </a>
                            <a href="/works/qa6km47i0xaa" class="group ml-12 flex min-w-0 flex-[0_0_90%] cursor-pointer flex-col items-baseline gap-4 transition-opacity duration-300 select-none sm:ml-5 sm:flex-[0_0_30%] hover:opacity-80">
                                <div>
                                    <img src="https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/4be151790e404ab4bc3fb298afc597b2/jirei-webgis-nabunken-sama.png?w=1000&amp;fm=webp&amp;ar=16%3A9&amp;fit=fill&amp;fill=blur" alt="60万件のデータをスムーズに表示！地図ビューアをフルリニューアルの画像" class="rounded-lg object-cover object-center group-hover:shadow-xl" style="view-transition-name: works-cover-image-qa6km47i0xaa">
                                </div>
                                <div>
                                    <p class="text-base">奈良文化財研究所 様</p>
                                    <p class="text-xl leading-8 font-bold tracking-normal underline-offset-2 group-hover:underline">60万件のデータをスムーズに表示！地図ビューアをフルリニューアル</p>
                                </div>
                            </a>
                            <!--]-->
                        </div>
                        <!--[!-->
                        <!--]-->
                    </div>
                    <!---->
                </section>
                <section class="container mt-24 mb-24">
                    <div class="my-8 flex flex-col gap-1 sm:gap-0">
                        <h2 class="heading-dot-page-community text-sp-heading-2 sm:text-heading-2">Community</h2>
                        <div class="text-sp-subheading-2 sm:text-subheading-2">コミュニティ</div>
                    </div>
                    <div class="flex flex-col items-start justify-between gap-8 sm:flex-row sm:gap-12">
                        <div class="text-description">
                            <p>わたしたちは、オープンソース・コミュニティから生まれた営利企業です。</p>
                            <p>持続可能なコミュニティと、公益的なエコシステムを育てていくために、さまざまな貢献に取り組んでいます。</p>
                        </div>
                        <a href="/community" class="group relative inline-flex w-fit items-center gap-4 rounded-full border border-mierune-black bg-transparent px-16 py-4 text-mierune-black transition-color duration-300 ease-in-out hover:bg-mierune-black hover:text-mierune-white" target="_self">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="absolute left-7 h-4 w-4 group-hover:animate-arrow-right">
                                <!--[!-->
                                <!--]-->
                                <!--[-->
                                <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                                <!--[-->
                                <!--]-->
                            </svg>
                            <!---->
                            <span class="whitespace-nowrap">もっと見る</span>
                        </a>
                        <!---->
                    </div>
                </section>
                <section class="relative">
                    <picture>
                        <source srcset="/_app/immutable/assets/top-dev-careers.DxxZ5V_j.avif 1x, /_app/immutable/assets/top-dev-careers.BXsKX5HD.avif 2x" type="image/avif">
                        <source srcset="/_app/immutable/assets/top-dev-careers.DkvXtw77.webp 1x, /_app/immutable/assets/top-dev-careers.DPUbwUVQ.webp 2x" type="image/webp">
                        <source srcset="/_app/immutable/assets/top-dev-careers.Bcsw5B_2.png 1x, /_app/immutable/assets/top-dev-careers.7CaI5IcY.png 2x" type="image/png">
                        <img src="/_app/immutable/assets/top-dev-careers.7CaI5IcY.png" alt="Sapporo - OpenStreetMap" class="absolute inset-0 -z-10 h-full w-full object-cover object-[center_60%]" width="2160" height="1440">
                    </picture>
                    <div class="absolute inset-0 -z-10 bg-[#52707A] mix-blend-multiply"></div>
                    <div class="text-mierune-white">
                        <div class="container pt-12 pb-10 sm:pt-20 sm:pb-16">
                            <div class="my-8 flex flex-col gap-1 sm:gap-5">
                                <h2 class="heading-dot-mierune-white text-sp-heading-2 sm:text-heading-2">Dev / Careers</h2>
                                <div class="text-sp-subheading-2 sm:text-subheading-2">技術・キャリア</div>
                            </div>
                            <div class="text-description">
                                <p>MIERUNEの「位置から、価値へ。」をささえる技術と働き方について、</p>
                                <p>こちらでご紹介しています。</p>
                            </div>
                            <div class="my-12">
                                <a href="https://welcome.mierune.co.jp/" class="group relative inline-flex w-fit items-center gap-4 rounded-full border bg-transparent px-16 py-4 transition-color duration-300 ease-in-out hover:bg-mierune-black hover:text-mierune-white border-mierune-white text-mierune-white" target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="absolute left-7 h-4 w-4 group-hover:animate-arrow-right">
                                        <!--[!-->
                                        <!--]-->
                                        <!--[-->
                                        <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                                        <!--]-->
                                        <!--[-->
                                        <!--]-->
                                        <!--[-->
                                        <!--]-->
                                        <!--[-->
                                        <!--]-->
                                        <!--[-->
                                        <!--]-->
                                        <!--[-->
                                        <!--]-->
                                    </svg>
                                    <!---->
                                    <span class="whitespace-nowrap">もっと見る</span>
                                </a>
                                <!---->
                            </div>
                        </div>
                    </div>
                </section>
                <!---->
                <section class="bg-mierune-blue py-16">
                    <div class="container">
                        <div class="self-star flex basis-4/12 items-center gap-3 sm:pb-8">
                            <div class="flex w-full flex-col gap-8 text-mierune-white">
                                <div class="absolute mt-[5px] mb-auto h-5 w-5 -translate-x-[28px] rounded-full bg-mierune-white"></div>
                                <div>
                                    <h2 class="text-[40px] sm:text-[44px]">Contact</h2>
                                    <p class="mt-1 text-lg font-bold">お問い合わせ</p>
                                </div>
                                <div class="flex flex-col justify-between gap-8 sm:flex-row sm:gap-8">
                                    <div class="flex flex-col gap-2">
                                        <span>位置情報の活用でお困りごとはありませんか？</span>
                                        <span>まずはお気軽にお問い合わせください。</span>
                                    </div>
                                    <a href="/contact" class="group relative inline-flex w-fit items-center gap-4 rounded-full border border-mierune-black px-16 py-4 text-mierune-black transition-color duration-300 ease-in-out hover:bg-mierune-black hover:text-mierune-white bg-mierune-white" target="_self">
                                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="absolute left-7 h-4 w-4 group-hover:animate-arrow-right">
                                            <!--[!-->
                                            <!--]-->
                                            <!--[-->
                                            <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                                            <!--]-->
                                            <!--[-->
                                            <!--]-->
                                            <!--[-->
                                            <!--]-->
                                            <!--[-->
                                            <!--]-->
                                            <!--[-->
                                            <!--]-->
                                            <!--[-->
                                            <!--]-->
                                        </svg>
                                        <!---->
                                        <span class="whitespace-nowrap">お問い合わせ</span>
                                    </a>
                                    <!---->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!---->
                <!---->
                <!---->
            </div>
            <footer class="mx-auto flex max-w-7xl flex-col gap-4.5 px-4 pt-6 pb-4">
                <div class="flex flex-col items-start justify-between gap-4 sm:gap-1.5 md:flex-row md:items-center">
                    <div class="-ml-3 flex items-center gap-3">
                        <a href="/" class="transition duration-500 hover:opacity-75">
                            <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.2 92.5" role="img" class="h-auto text-[#005773] w-[161.4px]">
                                <title>MIERUNE</title>
                                <g>
                                    <path fill="currentColor" d="M59.4,65.4c-4.2-.2-8.5-.3-12.7-.3s-8.5,0-12.7.3c-1.2,0-2.3,0-3.5.2.2-2.6.4-5.1.5-7.7.1-2.7.2-5.4.3-8.2v-7.2c0-2.7-.1-5.4-.3-8.2-.1-2.6-.3-5.1-.5-7.7-.2-2.7-.5-5.5-.8-8.2-2.8-.2-5.5-.4-8.3-.7.3,2.8.6,5.5.8,8.3.6,6.7.8,13.4.8,20.1s-.3,13.4-.8,20.1c-.1,1-.2,1.9-.3,2.9-.2,1.8-.4,3.6-.6,5.4,2.8-.3,5.5-.5,8.3-.7,5.7-.4,11.4-.6,17-.6s9,0,13.5.4c-.3-2.6-.5-5.2-.7-7.7v-.5"></path>
                                    <path fill="currentColor" d="M70.3,46.2c0-6.6.3-13.4.8-20.1,0-1,.2-1.9.3-2.9.2-1.8.3-3.6.6-5.4-2.8.3-5.5.5-8.3.7-5.7.4-11.4.6-17,.6s-9-.1-13.5-.4c.3,2.6.5,5.2.7,7.7v.5c4.2.2,8.5.3,12.7.3s8.5-.1,12.7-.3c1.2-.1,2.3-.1,3.5-.2-.2,2.6-.4,5.1-.5,7.7h-27.9c0,2.7.2,5.4.2,8.1h27.6v7.2h-27.5c0,2.8,0,5.5-.2,8.2h28c0,2.6.3,5.1.5,7.7.2,2.7.5,5.5.8,8.2,2.8.2,5.5.4,8.3.7-.3-2.8-.6-5.5-.8-8.3-.7-6.7-1-13.4-1-20.1"></path>
                                    <path fill="currentColor" d="M208.7,52.7c-.5,1-1.1,1.8-1.8,2.5-.8.7-1.7,1.2-2.7,1.6-1,.4-2.1.6-3.3.6s-2.3-.2-3.3-.6c-1-.4-1.9-.9-2.7-1.6-.8-.7-1.4-1.5-1.8-2.5-.4-1-.7-2.1-.7-3.3v-14.9h5.5v14.7c0,1,.3,1.9.8,2.4.5.6,1.2.8,2.2.8s1.7-.3,2.2-.8c.5-.6.8-1.4.8-2.4v-14.7h5.5v14.8c0,1.3-.2,2.4-.7,3.4"></path>
                                    <path fill="currentColor" d="M115.4,34.5h-6l-5,9.9-5-9.9h-6c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.1v-10.7l3.2,5.5h3.5l3.2-5.5v10.7h6.1c-.5-3.7-.8-7.4-.8-11.2-.2-3.8,0-7.5.7-11.2"></path>
                                    <path fill="currentColor" d="M131.5,34.5h-6.9c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.9c-.5-3.7-.8-7.4-.8-11.2s.3-7.5.8-11.2"></path>
                                    <path fill="currentColor" d="M141.6,45.7c0,3.8-.3,7.5-.8,11.2h15.8v-4.9h-9.7v-3.9h8.3v-4.9h-8.3v-3.7h9.7v-4.9h-15.8c.5,3.6.8,7.3.8,11.1"></path>
                                    <path fill="currentColor" d="M180.6,46.8c.4-.4.8-.8,1.2-1.3.3-.5.6-1,.9-1.7.2-.6.3-1.3.3-2.1s-.2-1.8-.5-2.7-.8-1.6-1.5-2.3c-.6-.7-1.4-1.2-2.4-1.6s-2.1-.6-3.3-.6h-9.4c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.1v-8.3h1.9l4,8.3h6.4l-4.8-9.3c.2-.2.7-.5,1.1-.8M176.8,43.3c-.4.5-1,.7-1.8.7h-3.1v-4.5h3.1c.8,0,1.3.2,1.8.7.4.5.6,1,.6,1.6s-.2,1-.6,1.5"></path>
                                    <path fill="currentColor" d="M237.3,34.5h-6.1v11.3l-7.2-11.3h-5.4c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h6.1v-11.2l7.2,11.3h5.4c-.5-3.7-.8-7.4-.8-11.2s.2-7.6.8-11.3"></path>
                                    <path fill="currentColor" d="M262.4,39.5v-4.9h-15.8c.5,3.7.8,7.4.8,11.2s-.3,7.5-.8,11.2h15.8v-4.9h-9.7v-3.9h8.3v-4.9h-8.3v-3.7h9.7Z"></path>
                                </g>
                            </svg>
                            <!---->
                        </a>
                        <div class="text-xs font-medium palt">位置から、価値へ。</div>
                    </div>
                    <nav>
                        <ul class="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6" aria-label="footer navigation">
                            <!--[-->
                            <li>
                                <a class="hover:underline" href="/about">About</a>
                            </li>
                            <li>
                                <a class="hover:underline" href="/business">Business</a>
                            </li>
                            <li>
                                <a class="hover:underline" href="/community">Community</a>
                            </li>
                            <li>
                                <a class="hover:underline" href="/works">Works</a>
                            </li>
                            <li>
                                <a class="hover:underline" href="/news">News</a>
                            </li>
                            <!--]-->
                        </ul>
                    </nav>
                </div>
                <div class="flex flex-col-reverse items-start justify-between gap-4 text-xs opacity-50 sm:gap-1.5 md:flex-row md:items-center">
                    <div>© 2016-2025 MIERUNE Inc.</div>
                    <nav>
                        <ul class="flex flex-wrap gap-x-6 gap-y-2" aria-label="footer navigation">
                            <!--[-->
                            <li>
                                <a class="hover:underline" href="/privacy">プライバシーポリシー</a>
                            </li>
                            <li>
                                <a class="hover:underline" href="/quality-and-security">品質・情報セキュリティ方針</a>
                            </li>
                            <li>
                                <a class="hover:underline" href="/legal">特定商取引法に基づく表記</a>
                            </li>
                            <!--]-->
                        </ul>
                    </nav>
                </div>
            </footer>
            <!---->
            <!---->
            <!--]-->
            <!--[!-->
            <!--]-->
            <!--]-->
            <script>
                {
                    __sveltekit_1negqwr = {
                        base: new URL(".",location).pathname.slice(0, -1)
                    };

                    const element = document.currentScript.parentElement;

                    Promise.all([import("./_app/immutable/entry/start.iPO0jzpE.js"), import("./_app/immutable/entry/app.BtUZvKv2.js")]).then( ([kit,app]) => {
                        kit.start(app, element, {
                            node_ids: [0, 2],
                            data: [null, {
                                type: "data",
                                data: {
                                    newsList: {
                                        contents: [{
                                            id: "a5z6hll9eskp",
                                            createdAt: "2025-06-02T04:44:57.184Z",
                                            updatedAt: "2025-06-02T08:16:48.578Z",
                                            publishedAt: "2025-06-02T08:16:48.578Z",
                                            revisedAt: "2025-06-02T08:16:48.578Z",
                                            title: "東京拠点移転のお知らせ",
                                            content: [{
                                                fieldId: "rich",
                                                html: "\u003Cp>MIERUNEは、2025年6月1日に設立10年目という記念すべき日を迎えました。\u003C/p>\u003Cp>\u003C/p>\u003Cp>わずか3人で創業しましたMIERUNEは、皆様の温かいご愛顧とご指導のおかげで、頼もしいメンバーが加入し38名となりました。\u003C/p>\u003Cp>応援してくださった皆様に、心からの感謝を込めて御礼申し上げます。\u003C/p>\u003Cp>\u003C/p>\u003Cp>この10期目の節目に、私たちは新たなスローガン「位置から、価値へ」を掲げました。\u003C/p>\u003Cp>「位置」の持つ無限の可能性を「価値」へと昇華させ、お客様と社会全体の課題解決に貢献する……それが私たちの揺るぎない決意であり、これからも社員一丸となって未来を切り拓くお手伝いをさせていただきます。\u003C/p>\u003Cp>\u003Ca href=\"https://www.mierune.co.jp/about\">About - 株式会社MIERUNE\u003C/a>\u003C/p>\u003Cp>\u003C/p>\u003Cp>また、社員数の増加と営業拠点の強化を目的に、東京オフィスを移転いたしました。\u003C/p>\u003Cp>MIERUNEにとって、東京で初めてとなる個室拠点には、会議室なども併設しています。\u003C/p>\u003Cp>お近くにお越しの際は、ぜひお気軽にお立ち寄りください。\u003C/p>\u003Cp>\u003C/p>\u003Cp>新・東京オフィス\u003C/p>\u003Cp>〒101-0052\u003Cbr>東京都千代田区神田小川町2丁目4-14 フィールドクレストビル 8F\u003C/p>\u003Cp>\u003C/p>\u003Cfigure>\u003Cimg src=\"https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/c8d914ccc36f44acbd058a983e71170f/office_building.jpg?w=800&amp;h=1066\" alt=\"\" width=\"800\" height=\"1066\">\u003C/figure>"
                                            }],
                                            tags: {
                                                id: "release",
                                                createdAt: "2025-05-07T11:08:09.872Z",
                                                updatedAt: "2025-05-07T11:13:58.482Z",
                                                publishedAt: "2025-05-07T11:08:09.872Z",
                                                revisedAt: "2025-05-07T11:08:09.872Z",
                                                title: "リリース"
                                            },
                                            "meta-description": "MIERUNEは、2025年6月1日に設立10年目という記念すべき日を迎えました。\n\nわずか3人で創業しましたMIERUNEは、皆様の温かいご愛顧とご指導のおかげで、頼もしいメンバーが加入し38名となりました。\n\n応援してくださった皆様に、心からの感謝を込めて御礼申し上げます。"
                                        }, {
                                            id: "ke0b3-gen5",
                                            createdAt: "2025-05-07T10:32:32.685Z",
                                            updatedAt: "2025-05-07T12:47:45.718Z",
                                            publishedAt: "2025-04-02T01:07:42.180Z",
                                            revisedAt: "2025-05-07T12:47:45.718Z",
                                            title: "エヴァンジェリスト古川が地理空間情報課ラボのスペシャルサポーターに就任しました",
                                            content: [{
                                                fieldId: "html",
                                                html: "\u003Cp>MIERUNEの取締役エヴァンジェリスト・古川が、国土交通省地理空間情報課が運営する『地理空間情報課ラボ』のスペシャルサポーターに就任しました。\u003Cbr>\u003Cbr>地理空間情報課は、地理空間データの整備・活用を担う部署で、国土数値情報の整備や不動産情報ライブラリの運営、データ連携環境の構築などを行っています。\u003Cbr>本活動において、産学官での双方向のコミュニケーションを通じて、実験的な取組や、データ連携に資するアイデア募集などが行われています。\u003Cbr>\u003Cbr>古川は、総務省地域情報化アドバイザーやCode for Japanのフェローとしての経験を持ち、国内外でのオープンデータと位置情報分野の活用に精通していることから、今回の就任となりました。\u003Cbr>\u003Cbr>MIERUNEでは、これからも官民の連携を通じた公共オープンデータの公開・利用の促進に尽力してまいります。\u003Cbr>\u003Cbr>地理空間情報課ラボの詳細は\u003Ca href=\"https://www.mlit-gis-lab.jp/\" target=\"_blank\" rel=\"noopener noreferrer\">こちら\u003C/a>\u003C/p>"
                                            }],
                                            tags: {
                                                id: "release",
                                                createdAt: "2025-05-07T11:08:09.872Z",
                                                updatedAt: "2025-05-07T11:13:58.482Z",
                                                publishedAt: "2025-05-07T11:08:09.872Z",
                                                revisedAt: "2025-05-07T11:08:09.872Z",
                                                title: "リリース"
                                            },
                                            "meta-description": "MIERUNE古川が、国土交通省地理空間情報課が運営する『地理空間情報課ラボ』のスペシャルサポーターに就任しました。"
                                        }, {
                                            id: "yskkc8z8pjor",
                                            createdAt: "2025-05-07T12:30:00.418Z",
                                            updatedAt: "2025-05-19T04:43:04.965Z",
                                            publishedAt: "2025-03-25T12:30:00.000Z",
                                            revisedAt: "2025-05-19T04:43:04.965Z",
                                            title: "iPhoneでもAndroidでも試せる 無償の3Dスキャン・アプリScanivers（Interface 2025年5月号）",
                                            content: [{
                                                fieldId: "rich",
                                                html: "\u003Cp>3月25日発売の「Interface 2025年5月号」にMIERUNEの西尾が執筆した記事が掲載されました。\u003Cbr>ぜひご覧ください。\u003C/p>\u003Ch3 style=\"text-align: justify\" id=\"h9707d3a59a\">\u003Cstrong>概要\u003C/strong>\u003C/h3>\u003Cp style=\"text-align: justify\">\u003Cstrong>タイトル\u003C/strong>\u003Cbr>iPhoneでもAndroidでも試せる 無償の3Dスキャン・アプリScanivers\u003C/p>\u003Cp style=\"text-align: justify\">\u003Cstrong>掲載誌\u003C/strong>\u003Cbr>CQ出版社\u003Cbr>\u003Ca href=\"https://interface.cqpub.co.jp/magazine/202505/\" target=\"_blank\" rel=\"noopener noreferrer nofollow\">Interface 2025年5月号\u003C/a>\u003C/p>\u003Cp style=\"text-align: justify\">\u003Cstrong>発売日\u003C/strong>\u003Cbr>2025年3月25日(火)\u003C/p>\u003Cp style=\"text-align: justify\">\u003Cstrong>執筆者\u003C/strong>\u003Cbr>西尾 悟\u003C/p>"
                                            }],
                                            tags: {
                                                id: "article",
                                                createdAt: "2025-05-07T11:07:48.705Z",
                                                updatedAt: "2025-05-07T11:20:18.703Z",
                                                publishedAt: "2025-05-07T11:07:48.705Z",
                                                revisedAt: "2025-05-07T11:20:18.703Z",
                                                title: "記事掲載・出演"
                                            }
                                        }, {
                                            id: "z76kzkuo6",
                                            createdAt: "2025-05-07T12:29:38.796Z",
                                            updatedAt: "2025-05-19T04:47:14.257Z",
                                            publishedAt: "2025-03-03T12:29:38.000Z",
                                            revisedAt: "2025-05-19T04:47:14.257Z",
                                            title: "Amazon Location Service の新機能を QGIS で利用する（builders.flash コミュニティ通信）",
                                            content: [{
                                                fieldId: "rich",
                                                html: "\u003Cp>MIERUNEのCOO桐本がAmazon Location Service に関して執筆した技術記事がAWS公式ウェブマガジン「\u003Ca href=\"https://aws.amazon.com/jp/builders-flash/\" target=\"_blank\" rel=\"noopener noreferrer\">builders.flash\u003C/a>」のコミュニティ通信に掲載されました、ぜひご覧ください。\u003C/p>\u003Ch3 id=\"h9707d3a59a\">\u003Cstrong>概要\u003C/strong>\u003C/h3>\u003Cp style=\"text-align: justify\">\u003Cstrong>タイトル\u003C/strong>\u003Cbr>\u003Ca href=\"https://aws.amazon.com/jp/builders-flash/202503/try-location-service-on-qgis/\" target=\"_blank\" rel=\"noopener noreferrer\">Amazon Location Service の新機能を QGIS で利用する\u003C/a>\u003C/p>\u003Cp>\u003Cstrong>掲載サイト\u003C/strong>\u003Cbr>Amazon Web Services\u003Cbr>\u003Ca href=\"https://aws.amazon.com/jp/builders-flash/\" target=\"_blank\" rel=\"noopener noreferrer nofollow\">builders.flash\u003C/a>\u003C/p>\u003Cp>\u003Cstrong>執筆者\u003C/strong>\u003Cbr>COO 桐本 靖規\u003C/p>"
                                            }],
                                            tags: {
                                                id: "article",
                                                createdAt: "2025-05-07T11:07:48.705Z",
                                                updatedAt: "2025-05-07T11:20:18.703Z",
                                                publishedAt: "2025-05-07T11:07:48.705Z",
                                                revisedAt: "2025-05-07T11:20:18.703Z",
                                                title: "記事掲載・出演"
                                            }
                                        }, {
                                            id: "6cor_jizbm",
                                            createdAt: "2025-05-07T10:35:29.718Z",
                                            updatedAt: "2025-05-07T12:47:46.811Z",
                                            publishedAt: "2025-02-14T09:25:01.758Z",
                                            revisedAt: "2025-05-07T12:47:46.811Z",
                                            title: "QGISの「Large Sustaining Member」に就任しました",
                                            content: [{
                                                fieldId: "html",
                                                html: "\u003Cp>MIERUNEは、このたびQGISの「Sustaining Membership Program」において、ラージスポンサー（Large Sustaining Member）を務めることとなりました。\u003Cbr>\u003Cbr>このプログラムは、QGISの持続的な開発・維持・発展を支える支援制度であり、集まった資金はQGISのメンテナンス、新機能の開発、ドキュメント作成、環境維持費用などに充てられ、その恩恵は世界中のユーザーに還元されます。\u003Cbr>\u003Cbr>MIERUNEは、2016年の創業以来、QGISのエコシステムやコミュニティへの貢献を続けており、これまで「Medium Sustaining Member」としてスポンサードしてきました。\u003Cbr>\u003Cbr>また、2024年には「QGIS LAB by MIERUNE」のローンチや「QGISエンジニア」専門職種の導入を行うなど、QGIS事業へのコミットメントを一層強化しています。\u003Cbr>\u003Cbr>そこで、QGISシステムのより大きな発展を目指すために「Large Sustaining Member」への昇格を決定しました。\u003Cbr>\u003Cbr>「Large」の称号は、年間9,000ユーロ以上のスポンサードを行った団体に与えられるもので、投稿日現在、Largeスポンサーを務める団体は日本唯一となります。\u003Cbr>\u003Cbr>今後もMIERUNEは、QGISの普及・発展を支援し、その持続可能な成長に貢献してまいります。\u003Cbr>\u003Cbr>\u003Cimg src=\"https://images.microcms-assets.io/assets/2a696ef9c3ea4f23b563e4b8a526257c/8157a1df5d6f4daf879418ec022265f4/qgis_large_sustaining-member_2025_highres.png?w=500&amp;h=583\" alt=\"\">\u003C/p>"
                                            }],
                                            tags: {
                                                id: "release",
                                                createdAt: "2025-05-07T11:08:09.872Z",
                                                updatedAt: "2025-05-07T11:13:58.482Z",
                                                publishedAt: "2025-05-07T11:08:09.872Z",
                                                revisedAt: "2025-05-07T11:08:09.872Z",
                                                title: "リリース"
                                            },
                                            "meta-description": "MIERUNEは、このたびQGISの「Sustaining Membership Program」において、ラージスポンサー（Large Sustaining Member）を務めることとなりました。"
                                        }],
                                        totalCount: 205,
                                        offset: 0,
                                        limit: 5
                                    },
                                    works: {
                                        contents: [{
                                            id: "sdb32oima",
                                            createdAt: "2025-06-04T10:07:16.841Z",
                                            updatedAt: "2025-06-04T10:44:30.214Z",
                                            publishedAt: "2025-06-04T10:25:09.079Z",
                                            revisedAt: "2025-06-04T10:44:30.214Z",
                                            client: "宇宙航空研究開発機構（JAXA）様",
                                            workTitle: "JAXA Earth API プラグイン",
                                            title: "JAXA提供データを数クリックでQGISに！",
                                            content: "\u003Cp>宇宙航空研究開発機構（JAXA）提供の、気温、降水量、植生などの地球観測データを取得できる「\u003Ca href=\"https://data.earth.jaxa.jp/ja/\" target=\"_blank\" rel=\"noopener noreferrer nofollow\">\u003Cu>JAXA Earth API\u003C/u>\u003C/a>」を使用して、\u003Cstrong>QGISから数クリックで衛星データを検索・閲覧できるプラグイン\u003C/strong>です。\u003C/p>\u003Cp>\u003Cstrong>ユースケース・使い方\u003C/strong>\u003C/p>\u003Cp>\u003Ca href=\"https://qgis.mierune.co.jp/posts/usecase_jaxa-satellite-data\" target=\"_blank\" rel=\"noopener noreferrer\">QGISに衛星データを簡単に追加する方法 〜JAXA Earth APIプラグインの使い方とデータセットの紹介〜 - QGIS LAB by MIERUNE\u003C/a>\u003C/p>",
                                            tags: [{
                                                id: "qgis-plugin",
                                                createdAt: "2025-04-27T13:35:19.868Z",
                                                updatedAt: "2025-05-01T03:12:59.071Z",
                                                publishedAt: "2025-04-27T13:35:19.868Z",
                                                revisedAt: "2025-04-27T13:35:27.957Z",
                                                title: "QGISプラグイン",
                                                category: ["Works"]
                                            }, {
                                                id: "beyond-together",
                                                createdAt: "2025-04-11T09:33:59.716Z",
                                                updatedAt: "2025-04-24T08:25:50.402Z",
                                                publishedAt: "2025-04-11T09:33:59.716Z",
                                                revisedAt: "2025-04-21T10:20:35.455Z",
                                                title: "受託開発",
                                                category: ["Works"]
                                            }, {
                                                id: "qgis",
                                                createdAt: "2025-04-18T06:55:22.141Z",
                                                updatedAt: "2025-05-15T03:09:10.682Z",
                                                publishedAt: "2025-04-18T06:55:22.141Z",
                                                revisedAt: "2025-04-18T06:55:22.141Z",
                                                title: "QGIS",
                                                category: ["Tech"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/f116e1efea114a3ba33e436b796adae2/jirei-jaxa-sama.webp",
                                                height: 581,
                                                width: 1080
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/00954b45ee474a4985ca69eb1a340b47/jirei-jaxa-sama2.webp",
                                                height: 547,
                                                width: 1080
                                            }, {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/f116e1efea114a3ba33e436b796adae2/jirei-jaxa-sama.webp",
                                                height: 581,
                                                width: 1080
                                            }],
                                            meta: {
                                                fieldId: "meta",
                                                description: "宇宙航空研究開発機構（JAXA）提供の、気温、降水量、植生などの地球観測データを取得できる「JAXA Earth API」を使用して、QGISから数クリックで衛星データを検索・閲覧できるプラグインです。",
                                                image: {
                                                    url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/f116e1efea114a3ba33e436b796adae2/jirei-jaxa-sama.webp",
                                                    height: 581,
                                                    width: 1080
                                                }
                                            },
                                            showOnOtherPage: ["Businessページ：QGIS：QGIS Plugins", "トップページ：Business セクション"]
                                        }, {
                                            id: "q10ft1tjc4",
                                            createdAt: "2025-04-18T08:36:14.909Z",
                                            updatedAt: "2025-06-04T10:45:25.61Z",
                                            publishedAt: "2025-04-18T08:36:14.909Z",
                                            revisedAt: "2025-05-15T01:51:41.657Z",
                                            client: "自社",
                                            workTitle: "QGIS研修 公開講座",
                                            title: "MIERUNEのQGIS研修 〜450人以上が受講した⁨開発チーム公認の講習会〜",
                                            content: "\u003Cp>MIERUNEでは、豊富な経験を持つプロフェッショナルによるQGIS研修を提供しています。初心者からGISの基礎を学びたい方、あるいはすでにGISを使っているが更なるスキルアップを目指している方に向けて、幅広いニーズに対応するコースを用意しています。\u003C/p>\u003Cp>\u003C/p>\u003Cp>\u003Ca href=\"https://qgis.mierune.co.jp/posts/blog_mierune-qgis-training\" target=\"_blank\" rel=\"noopener noreferrer\">GISの基礎から応用までを完全サポート！MIERUNEのQGIS研修の紹介\u003C/a>\u003C/p>",
                                            date: "2025-03-31T15:00:00.000Z",
                                            tags: [{
                                                id: "qgis",
                                                createdAt: "2025-04-18T06:55:22.141Z",
                                                updatedAt: "2025-05-15T03:09:10.682Z",
                                                publishedAt: "2025-04-18T06:55:22.141Z",
                                                revisedAt: "2025-04-18T06:55:22.141Z",
                                                title: "QGIS",
                                                category: ["Tech"]
                                            }, {
                                                id: "training",
                                                createdAt: "2025-04-21T10:22:06.215Z",
                                                updatedAt: "2025-04-24T08:33:56.860Z",
                                                publishedAt: "2025-04-21T10:22:06.215Z",
                                                revisedAt: "2025-04-21T10:22:06.215Z",
                                                title: "研修",
                                                category: ["Works"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/191f60d2e58a4c2b8cf7c0523ac23051/jirei-qgis-support.jpg",
                                                height: 3024,
                                                width: 4032
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/191f60d2e58a4c2b8cf7c0523ac23051/jirei-qgis-support.jpg",
                                                height: 3024,
                                                width: 4032
                                            }],
                                            meta: {
                                                fieldId: "meta"
                                            },
                                            showOnOtherPage: ["Businessページ：QGIS：QGIS Training", "トップページ：Business セクション"]
                                        }, {
                                            id: "qtg527xkwv",
                                            createdAt: "2025-04-18T08:35:43.890Z",
                                            updatedAt: "2025-06-04T10:25:35.129Z",
                                            publishedAt: "2025-04-18T08:35:43.890Z",
                                            revisedAt: "2025-05-15T08:53:55.022Z",
                                            client: "自社",
                                            workTitle: "GTFS-GO",
                                            title: "全世界で使われる公共交通可視化プラグイン「GTFS-GO」",
                                            content: "\u003Cp>「GTFS-GO」は、公共交通機関にまつわるあらゆる情報を格納するための国際規格である「GTFS」形式のデータを、QGIS上で簡単に表示することができるプラグインです。\u003C/p>\u003Cp>停留所を表示できるほか、系統ごとに色を分けて路線を表示したり、運行頻度ごとに線の太さを変えた地図を作成することが可能です\u003C/p>",
                                            date: "2025-03-31T15:00:00.000Z",
                                            tags: [{
                                                id: "qgis-plugin",
                                                createdAt: "2025-04-27T13:35:19.868Z",
                                                updatedAt: "2025-05-01T03:12:59.071Z",
                                                publishedAt: "2025-04-27T13:35:19.868Z",
                                                revisedAt: "2025-04-27T13:35:27.957Z",
                                                title: "QGISプラグイン",
                                                category: ["Works"]
                                            }, {
                                                id: "in-house-development",
                                                createdAt: "2025-04-11T04:35:44.096Z",
                                                updatedAt: "2025-04-24T08:33:27.723Z",
                                                publishedAt: "2025-04-11T04:35:44.096Z",
                                                revisedAt: "2025-04-21T10:20:40.457Z",
                                                title: "自社開発",
                                                category: ["Works"]
                                            }, {
                                                id: "qgis",
                                                createdAt: "2025-04-18T06:55:22.141Z",
                                                updatedAt: "2025-05-15T03:09:10.682Z",
                                                publishedAt: "2025-04-18T06:55:22.141Z",
                                                revisedAt: "2025-04-18T06:55:22.141Z",
                                                title: "QGIS",
                                                category: ["Tech"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/ac0bbdfefb42417799f5ca97f8d8ef39/jirei-gtfs-go.webp",
                                                height: 860,
                                                width: 1080
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/ac0bbdfefb42417799f5ca97f8d8ef39/jirei-gtfs-go.webp",
                                                height: 860,
                                                width: 1080
                                            }],
                                            meta: {
                                                fieldId: "meta"
                                            },
                                            showOnOtherPage: ["Businessページ：QGIS：QGIS Plugins", "トップページ：Business セクション"]
                                        }, {
                                            id: "mg6t-g0jkw",
                                            createdAt: "2025-04-18T08:35:12.726Z",
                                            updatedAt: "2025-05-15T01:39:20.240Z",
                                            publishedAt: "2025-04-18T08:35:12.726Z",
                                            revisedAt: "2025-05-15T01:39:20.240Z",
                                            client: "一般社団法人 日本森林技術協会 様",
                                            workTitle: "森林ゾーニング支援 QGISプラグイン「もりぞん」開発",
                                            title: "QGIS上で収益性と災害リスクを考慮した森林ゾーニングを可能に",
                                            content: "\u003Cp>林野庁による、路網整備や再造林対策の効果的な推進のための収益性・災害リスク両面のデータに基づく分析・評価を行うゾーニング手法を、QGISで簡易に実施するために開発されたプラグインです。\u003C/p>\u003Cp>収益性と災害リスクの4象限図の理念に沿ったゾーニングを行うことが可能となります。\u003C/p>\u003Cp>\u003Ca href=\"https://www.geospatial.jp/ckan/dataset/rinya-morizon-dateset\" target=\"_blank\" rel=\"noopener noreferrer nofollow\">森林ゾーニング支援ツール「もりぞん」\u003C/a>\u003C/p>\u003Cp>画像は「\u003Ca href=\"https://www.geospatial.jp/ckan/dataset/rinya-morizon-dateset/resource/a4d0ae9c-36e8-48c6-8474-3d1d4312e061\" target=\"_blank\" rel=\"noopener noreferrer nofollow\">収益性と災害リスクを考慮した 森林ゾーニングの手引き\u003C/a>」から引用\u003C/p>",
                                            date: "2025-03-31T15:00:00.000Z",
                                            tags: [{
                                                id: "qgis",
                                                createdAt: "2025-04-18T06:55:22.141Z",
                                                updatedAt: "2025-05-15T03:09:10.682Z",
                                                publishedAt: "2025-04-18T06:55:22.141Z",
                                                revisedAt: "2025-04-18T06:55:22.141Z",
                                                title: "QGIS",
                                                category: ["Tech"]
                                            }, {
                                                id: "beyond-together",
                                                createdAt: "2025-04-11T09:33:59.716Z",
                                                updatedAt: "2025-04-24T08:25:50.402Z",
                                                publishedAt: "2025-04-11T09:33:59.716Z",
                                                revisedAt: "2025-04-21T10:20:35.455Z",
                                                title: "受託開発",
                                                category: ["Works"]
                                            }, {
                                                id: "qgis-plugin",
                                                createdAt: "2025-04-27T13:35:19.868Z",
                                                updatedAt: "2025-05-01T03:12:59.071Z",
                                                publishedAt: "2025-04-27T13:35:19.868Z",
                                                revisedAt: "2025-04-27T13:35:27.957Z",
                                                title: "QGISプラグイン",
                                                category: ["Works"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/cc6387220777463ab347a27e7f966ff8/jirei-morizon.png",
                                                height: 4500,
                                                width: 6702
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/cc6387220777463ab347a27e7f966ff8/jirei-morizon.png",
                                                height: 4500,
                                                width: 6702
                                            }],
                                            meta: {
                                                fieldId: "meta"
                                            },
                                            showOnOtherPage: ["Businessページ：Solution：Beyond Together", "トップページ：Business セクション"]
                                        }, {
                                            id: "c_pygqrasz",
                                            createdAt: "2025-04-18T08:34:03.650Z",
                                            updatedAt: "2025-06-04T10:45:19.072Z",
                                            publishedAt: "2025-04-18T08:34:03.650Z",
                                            revisedAt: "2025-06-04T10:45:06.701Z",
                                            client: "自社",
                                            workTitle: "QGIS商用サポート",
                                            title: "QGISを安心してご利用いただける 「QGIS 商用サポート」",
                                            content: "\u003Cp>豊富な実績を持つQGISスペシャリストが、QGISの効果的な操作方法と活用方法をサポートいたします。\u003C/p>\u003Cp>\u003C/p>\u003Cp>詳細・価格などのご案内(PDF／準備中)\u003C/p>",
                                            date: "2025-03-31T15:00:00.000Z",
                                            tags: [{
                                                id: "qgis",
                                                createdAt: "2025-04-18T06:55:22.141Z",
                                                updatedAt: "2025-05-15T03:09:10.682Z",
                                                publishedAt: "2025-04-18T06:55:22.141Z",
                                                revisedAt: "2025-04-18T06:55:22.141Z",
                                                title: "QGIS",
                                                category: ["Tech"]
                                            }, {
                                                id: "in-house-service",
                                                createdAt: "2025-04-21T10:20:49.670Z",
                                                updatedAt: "2025-04-24T08:33:44.083Z",
                                                publishedAt: "2025-04-21T10:20:49.670Z",
                                                revisedAt: "2025-04-21T10:20:49.670Z",
                                                title: "自社サービス",
                                                category: ["Works"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/0378bb3c94744c529bcdd0d8a8a30da7/jirei-support.jpg",
                                                height: 4480,
                                                width: 6720
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/0378bb3c94744c529bcdd0d8a8a30da7/jirei-support.jpg",
                                                height: 4480,
                                                width: 6720
                                            }],
                                            meta: {
                                                fieldId: "meta"
                                            },
                                            showOnOtherPage: ["Businessページ：QGIS：QGIS Support", "トップページ：Business セクション"]
                                        }, {
                                            id: "w4ul1s2qwrq",
                                            createdAt: "2025-04-18T08:33:26.118Z",
                                            updatedAt: "2025-06-04T10:45:13.565Z",
                                            publishedAt: "2025-04-18T08:33:26.118Z",
                                            revisedAt: "2025-05-16T01:33:02.849Z",
                                            client: "自社",
                                            workTitle: "QGIS LAB by MIERUNE",
                                            title: "日本初！QGISに特化した総合情報メディア「QGIS LAB by MIERUNE」開設",
                                            content: "\u003Cp>「QGIS LAB by MIERUNE」は、QGISに関する最新情報や実践的なノウハウ、講習会を提供する総合情報メディアです。\u003C/p>\u003Cp>\u003Ca href=\"https://qgis.mierune.co.jp\" target=\"_blank\" rel=\"noopener noreferrer\">QGIS LAB by MIERUNE\u003C/a>\u003C/p>",
                                            date: "2024-10-31T15:00:00.000Z",
                                            tags: [{
                                                id: "qgis",
                                                createdAt: "2025-04-18T06:55:22.141Z",
                                                updatedAt: "2025-05-15T03:09:10.682Z",
                                                publishedAt: "2025-04-18T06:55:22.141Z",
                                                revisedAt: "2025-04-18T06:55:22.141Z",
                                                title: "QGIS",
                                                category: ["Tech"]
                                            }, {
                                                id: "in-house-service",
                                                createdAt: "2025-04-21T10:20:49.670Z",
                                                updatedAt: "2025-04-24T08:33:44.083Z",
                                                publishedAt: "2025-04-21T10:20:49.670Z",
                                                revisedAt: "2025-04-21T10:20:49.670Z",
                                                title: "自社サービス",
                                                category: ["Works"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/911ab4d13b10401cb5a6248de3a46ebe/qgis-lab-top-new-slogan.png",
                                                height: 1980,
                                                width: 3520
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/911ab4d13b10401cb5a6248de3a46ebe/qgis-lab-top-new-slogan.png",
                                                height: 1980,
                                                width: 3520
                                            }],
                                            meta: {
                                                fieldId: "meta"
                                            },
                                            showOnOtherPage: ["Businessページ：QGIS：QGIS Support", "トップページ：Business セクション"]
                                        }, {
                                            id: "saj834xpwanf",
                                            createdAt: "2025-04-11T10:13:07.466Z",
                                            updatedAt: "2025-06-04T10:25:26.75Z",
                                            publishedAt: "2025-04-11T10:13:07.466Z",
                                            revisedAt: "2025-05-15T05:22:13.418Z",
                                            client: "国土交通省 様",
                                            workTitle: "PLATEAU GIS Converter",
                                            title: "CityGML形式の3DモデルをGISデータに変換する変換ツールを開発",
                                            content: "\u003Cp>PLATEAU GIS Converterは、国土交通省が整備した「PLATEAU」の3D都市モデル(CityGML)を様々なフォーマットに変換するためのGUIおよびCLIツールです。\u003C/p>\u003Cp>このツールは、データをMinecraftワールドに変換することも可能で、子どもたちにデジタルツインの世界を体験してもらい、自分たちの街の将来を考えるワークショップといった取り組みも提供しています。\u003C/p>",
                                            date: "2024-12-31T15:00:00.000Z",
                                            tags: [{
                                                id: "other-gis",
                                                createdAt: "2025-04-21T10:21:14.460Z",
                                                updatedAt: "2025-04-24T08:32:30.252Z",
                                                publishedAt: "2025-04-21T10:21:14.460Z",
                                                revisedAt: "2025-04-21T10:21:14.460Z",
                                                title: "その他GIS",
                                                category: ["Works"]
                                            }, {
                                                id: "beyond-together",
                                                createdAt: "2025-04-11T09:33:59.716Z",
                                                updatedAt: "2025-04-24T08:25:50.402Z",
                                                publishedAt: "2025-04-11T09:33:59.716Z",
                                                revisedAt: "2025-04-21T10:20:35.455Z",
                                                title: "受託開発",
                                                category: ["Works"]
                                            }, {
                                                id: "rust",
                                                createdAt: "2025-04-18T07:47:42.443Z",
                                                updatedAt: "2025-05-01T03:20:25.093Z",
                                                publishedAt: "2025-04-18T07:47:42.443Z",
                                                revisedAt: "2025-04-18T07:47:42.443Z",
                                                title: "Rust",
                                                category: ["Tech"]
                                            }, {
                                                id: "plateau",
                                                createdAt: "2025-05-15T05:21:16.161Z",
                                                updatedAt: "2025-05-15T05:21:31.643Z",
                                                publishedAt: "2025-05-15T05:21:16.161Z",
                                                revisedAt: "2025-05-15T05:21:16.161Z",
                                                title: "PLATEAU",
                                                category: ["Tech"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/2c8c26e8b3b74a90ba66f98d2bc05745/jirei-mlit-sama-nusamai.png",
                                                height: 1291,
                                                width: 2557
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/2c8c26e8b3b74a90ba66f98d2bc05745/jirei-mlit-sama-nusamai.png",
                                                height: 1291,
                                                width: 2557
                                            }],
                                            meta: null,
                                            showOnOtherPage: ["Businessページ：Solution：Beyond Together", "トップページ：Business セクション"]
                                        }, {
                                            id: "qa6km47i0xaa",
                                            createdAt: "2025-04-11T09:47:22.374Z",
                                            updatedAt: "2025-06-04T10:25:18.957Z",
                                            publishedAt: "2025-04-11T09:47:22.374Z",
                                            revisedAt: "2025-05-15T01:40:33.452Z",
                                            client: "奈良文化財研究所 様",
                                            workTitle: "「文化財総覧WebGIS」フルリプレイス",
                                            title: "60万件のデータをスムーズに表示！地図ビューアをフルリニューアル",
                                            content: "\u003Cp>奈良文化財研究所 様の持つ、全国47都道府県の遺跡・建造物情報データおよそ67万件をWeb地図上で確認することができます。\u003C/p>\u003Cp>従来のビューアから、よりモダンな技術を採用することで、膨大なデータをシンプルかつスピーディに表示できるようにフルリプレイスを行いました。\u003C/p>",
                                            date: "2025-08-31T15:00:00.000Z",
                                            tags: [{
                                                id: "webgis",
                                                createdAt: "2025-04-11T04:35:16.472Z",
                                                updatedAt: "2025-04-21T09:41:19.81Z",
                                                publishedAt: "2025-04-11T04:36:07.677Z",
                                                revisedAt: "2025-04-11T04:36:07.677Z",
                                                title: "WebGIS",
                                                category: ["Works"]
                                            }, {
                                                id: "beyond-together",
                                                createdAt: "2025-04-11T09:33:59.716Z",
                                                updatedAt: "2025-04-24T08:25:50.402Z",
                                                publishedAt: "2025-04-11T09:33:59.716Z",
                                                revisedAt: "2025-04-21T10:20:35.455Z",
                                                title: "受託開発",
                                                category: ["Works"]
                                            }, {
                                                id: "svelte",
                                                createdAt: "2025-04-21T09:41:41.337Z",
                                                updatedAt: "2025-05-01T03:20:35.789Z",
                                                publishedAt: "2025-04-21T09:41:41.337Z",
                                                revisedAt: "2025-04-21T09:41:41.337Z",
                                                title: "Svelte",
                                                category: ["Tech"]
                                            }, {
                                                id: "maplibre-gl-js",
                                                createdAt: "2025-04-21T09:42:40.771Z",
                                                updatedAt: "2025-05-01T03:12:20.989Z",
                                                publishedAt: "2025-04-21T09:42:40.771Z",
                                                revisedAt: "2025-05-01T03:12:13.316Z",
                                                title: "MapLibre GL JS",
                                                category: ["Tech"]
                                            }, {
                                                id: "aws",
                                                createdAt: "2025-04-11T05:27:21.640Z",
                                                updatedAt: "2025-04-11T07:18:50.187Z",
                                                publishedAt: "2025-04-11T05:27:21.640Z",
                                                revisedAt: "2025-04-11T05:27:21.640Z",
                                                title: "AWS",
                                                category: ["Tech"]
                                            }, {
                                                id: "replace",
                                                createdAt: "2025-04-21T10:22:53.181Z",
                                                updatedAt: "2025-05-01T03:13:19.342Z",
                                                publishedAt: "2025-04-21T10:22:53.181Z",
                                                revisedAt: "2025-04-21T10:22:53.181Z",
                                                title: "フルリプレイス",
                                                category: ["Works"]
                                            }],
                                            clientComments: [],
                                            coverImage: {
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/4be151790e404ab4bc3fb298afc597b2/jirei-webgis-nabunken-sama.png",
                                                height: 1800,
                                                width: 3200
                                            },
                                            galleryImages: [{
                                                url: "https://images.microcms-assets.io/assets/17e5f8426e9a44738f138336f1da109a/4be151790e404ab4bc3fb298afc597b2/jirei-webgis-nabunken-sama.png",
                                                height: 1800,
                                                width: 3200
                                            }],
                                            meta: null,
                                            showOnOtherPage: ["Businessページ：Solution：AWS", "トップページ：Business セクション"]
                                        }],
                                        totalCount: 8,
                                        offset: 0,
                                        limit: 10
                                    }
                                },
                                uses: {}
                            }],
                            form: null,
                            error: null
                        });
                    }
                    );
                }
            </script>
        </div>
    </body>
</html>

		`;

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			text: vi.fn().mockResolvedValue(html),
		});

		const result = await parseMeta(url);

		expect(result).toEqual({
			result: {
				title: '株式会社MIERUNE - 位置から、価値へ。',
				meta: {
					viewport: 'width=device-width, initial-scale=1',
					description:
						'株式会社MIERUNEは、北海道で生まれた位置情報技術のプロフェッショナル集団です。',
					'og:title': '株式会社MIERUNE - 位置から、価値へ。',
					'og:site_name': '株式会社MIERUNE',
					'og:url': 'https://mierune.co.jp/',
					'og:description':
						'株式会社MIERUNEは、北海道で生まれた位置情報技術のプロフェッショナル集団です。',
					'og:type': 'website',
					'og:locale': 'ja_JP',
					'og:image': 'https://www.mierune.co.jp/ogp.webp',
					'twitter:card': 'summary_large_image',
				},
				favicons: ['https://mierune.co.jp/favicon.ico'],
			},
			error: null,
		});
	});
});
