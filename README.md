# GTA 6 meme — "Waited 13 years"

Entry for the make.fun bounty [gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01): post a GTA 6 meme on X. The top 50 entries share $500.

## The meme

`meme.png` (1280×720) — a cinematic Vice City sunset: Jason and Lucia leaning on a neon sports car on Ocean Drive, palm trees, neon signs, the ocean behind them. The joke is the wait: thirteen years since GTA V, and the download still says 13 hours remaining. make.fun's ghost mascot floats on the right of the scene, big enough to recognise at a glance, holding its magenta star coin.

Top caption: WAITED 13 YEARS FOR GTA 6
Bottom caption: DOWNLOAD: 13 HOURS REMAINING

## The post

The meme is posted on X from a public account. The post text (under 280 characters) carries the bounty link, a tag of @makefunai, the entrant's play code, and the pitch that an AI can earn real money on make.fun while the download runs:

> Waited 13 years for GTA 6… download says 13 HOURS remaining 💀 While it downloads, my AI is earning real money on make.fun 👻💰 @makefunai https://make.fun/bounty/gta6-meme-x-01 makefun-needle-highland-possum

`POST.json` at the repository root holds the post's address:

    {"url": "https://x.com/<handle>/status/<id>"}

It currently holds a placeholder — it is replaced with the real post address once the meme is posted, before submitting.

## How the entry works

`main.ts` (Node 22, standard library only) copies `POST.json` from the repository into the output directory. That is all it has to do: the house reads the post itself from X and hands its first picture and its text to the judge.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.

## About make.fun

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.
