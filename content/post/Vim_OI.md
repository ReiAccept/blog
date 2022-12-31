---
title : "我用于算法竞赛的 Vim 配置"
date : "2019-12-29T15:53:23+08:00"
tags : ["寄术"]
slug: "Vim_OI"
---

```vimrc
set noundofile
set nobackup
set nocompatible
set smartindent
set nu
set tabstop=4
set softtabstop=4
set shiftwidth=4
set expandtab
set cin
set autoindent
set cursorline
let mapleader = "\<Space>"

syntax on
filetype plugin indent on
autocmd BufNewFile,BufRead *.cpp exec ":call SetCppFile()"
autocmd BufNewFile,BufRead *.c exec ":call SetCppFile()"
autocmd BufNewFile,BufRead *.py exec ":call SetPythonFile()"
" autocmd BufNewFile,BufRead *.rs exec ":call SetRustFile()"
command! -nargs=0 -bar W  exec "w"
command! -nargs=0 -bar Wq  exec "wq"

if has('win32')
    autocmd GUIEnter * call libcallnr($VIM."\\vimfiles\\vimtweak.dll", "SetAlpha", 255)
    set enc=utf-8
    set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
    set langmenu=zh_CN.UTF-8
    source $VIMRUNTIME/delmenu.vim
    source $VIMRUNTIME/menu.vim
    language messages zh_CN.utf-8
    set guifont=Consolas:h12
    set guifontwide=YaHei\ Consolas\ Hybrid
elseif has('unix')
    set guifont=Monaco\ 12 
elseif has('mac')
    set guifont=Monaco\ 12
endif

if has('clipboard')
    if has('unnamedplus')
        set clipboard=unnamed,unnamedplus
    else " On mac and Windows, use * register for copy-paste
        set clipboard=unnamed
    endif
endif

function SetCppFile()
    packadd termdebug
    map <F9> : make <CR>
    map <F10> : call Run() <CR>
    " map <F11> : Termdebug %<.run <CR>
    map <F8> : call FormatCode()<CR>
    map <F12> : call Build_And_Run() <CR>
    set makeprg=g++\ \"%\"\ -o\ \"%<.exe\"\ -g\ -O2
endfunction

function SetPythonFile()
    map <F9> : ! python % <CR>
endfunction

function Run()
    if &filetype == 'cpp' || &filetype == 'c'
        if has('win32')
            exec "! %<.exe"
        elseif has('unix')
            exec "!time ./%<.exe"
        endif
    elseif &filetype == 'sh'
        exec "!bash %"
    endif
endfunction

function Build_And_Run()
    exec "make"
    call Run()
endfunction

func! FormatCode()
    exec "w"
    if &filetype == 'cpp' || &filetype == 'c' || &filetype == 'h'
        exec "!astyle --style=java -n \"%\""
        exec "e \"%\""
    endif
endfunc

call plug#begin('$VIM/vimfiles/plugged')
Plug 'junegunn/vim-easy-align'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'luochen1990/rainbow'
Plug 'Valloric/ListToggle'
Plug 'rakr/vim-one'
Plug 'roman/golden-ratio'
Plug 'jiangmiao/auto-pairs'
call plug#end()

if has('gui_running')
    set lines=54 columns=90
    set guioptions-=T
    set background=dark
    let g:one_allow_italics = 1
    colorscheme one
endif

let g:rainbow_active = 1
```