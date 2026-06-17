import type { Pathname } from '$app/types';
import type { Component } from 'svelte';

export type typeItemDoMenu =
	| {
			id: string;
			type: 'link';
			title: string;
			url: Pathname;
			icon?: Component;
	  }
	| {
			id: string;
			type: 'group';
			title: string;
			children: typeItemDoMenu[];
			icon?: Component;
	  };
