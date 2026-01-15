---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
math: true
slug: "{{ replace .Name " " "_" | title }}"
---