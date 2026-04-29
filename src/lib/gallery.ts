import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export type GalleryImage = {
	src: string;
	alt: string;
};

type GalleryMetaFile = {
	captions?: Record<string, string>;
	order?: string[];
};

function humanizeFilename(filename: string): string {
	const base = filename.replace(IMAGE_EXT, '').replace(/[-_]+/g, ' ').trim();
	return base || 'Photo';
}

function loadGalleryMeta(): GalleryMetaFile {
	const metaPath = path.join(process.cwd(), 'src', 'content', 'gallery.json');
	if (!fs.existsSync(metaPath)) return {};
	try {
		const raw = fs.readFileSync(metaPath, 'utf8');
		return JSON.parse(raw) as GalleryMetaFile;
	} catch {
		return {};
	}
}

/** Build-time list of images in `public/gallery/`. Optional captions and order in `src/content/gallery.json`. */
export function getGalleryImages(): GalleryImage[] {
	const galleryDir = path.join(process.cwd(), 'public', 'gallery');
	if (!fs.existsSync(galleryDir)) return [];

	const meta = loadGalleryMeta();
	let files = fs
		.readdirSync(galleryDir)
		.filter((f) => IMAGE_EXT.test(f));

	if (meta.order?.length) {
		const present = new Set(files);
		const ordered = meta.order.filter((f) => present.has(f));
		const rest = files
			.filter((f) => !ordered.includes(f))
			.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
		files = [...ordered, ...rest];
	} else {
		files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
	}

	return files.map((f) => ({
		src: `/gallery/${f}`,
		alt: meta.captions?.[f] ?? humanizeFilename(f),
	}));
}
