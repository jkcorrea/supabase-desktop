# Supabase Desktop

This is an unofficial desktop UI for Supabase projects. It was created for Supabase's [Launch Week 6 hackathon](https://supabase.com/blog/launch-week-6-hackathon), though I ended up getting sick during it and finished late :/.

<p align="center"><img src="./public/demo.gif" width="600" /></p>


## Why build it?

I've wanted wanted something like [Postico](https://www.google.com/search?client=safari&rls=en&q=postico&ie=UTF-8&oe=UTF-8&safari_group=7) (which I LOVE🖤), but with tighter integration for my Supabase projects. I hate having to switch between Postico, my own admin panels, and Supabase browser tabs to do various admin work.

But I'd be lying if I denied that I was also *[nerd sniped](https://xkcd.com/356/)* by [Tauri](https://tauri.app) & Rust. Been wanting to try them both out for a while now & I gotta say, Tauri has been freakin' amazing! Definitely recommend for building desktop/native apps.

## Features
- [x] Open local Supabase projects (requires `supabase init` to be ran in dir)
- [x] Open remote Supabase projects (hosted on supabase.com only, requires `supabase login` to be ran)
- [x] Read tables & data
- [ ] Update/delete rows
- [ ] Filter/sort tables
- [ ] Functions editor
- [ ] Migration editor
- [ ] Save state to system

## Development

### Requirements
- Node 18
- Tauri
- Rust + Cargo

```sh
pnpm install
pnpm tauri dev
```


### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
