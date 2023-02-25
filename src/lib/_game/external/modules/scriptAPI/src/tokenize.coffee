tokenize = (script) ->
	`var line`
	lines = []
	lineStart = 0
	i = 0
	while i < script.length
		char = script[i]
		if char == '\n'
			line = script.substring(lineStart, i)
			lines.push line
			lineStart = i + 1
		i++
	if lineStart < script.length
		line = script.substring(lineStart)
		lines.push line
	lines

module.exports = tokenize
