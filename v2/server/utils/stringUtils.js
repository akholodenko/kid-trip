import slugify from "slugify"

export const slug = name => slugify(name, {
	lower: true,
	remove: /[*+~.()'"!:@#^&]/g,
})

export const uniqueSlug = (slug, existingSlugs, addOn) => {
	if (existingSlugs.length) {
		if (existingSlugs.includes(`${slug}-${addOn}`)) {
			let counter = 1
			while (existingSlugs.includes(`${slug}-${counter}`)) {
				counter++
			}

			slug = `${slug}-${counter}`
		} else {
			slug = `${slug}-${addOn}`
		}
	}

	return slug
}