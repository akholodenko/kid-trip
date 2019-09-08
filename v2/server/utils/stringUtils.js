import slugify from "slugify"

export const slug = name => slugify(name, {
	lower: true,
	remove: /[*+~.()'"!:@#^&]/g,
})