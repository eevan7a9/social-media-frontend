import type { Component } from 'vue';

export interface MenuLink {
  icon: Component;
  title: string;
  path: string;
  bg: string;
  fill: string;
}
