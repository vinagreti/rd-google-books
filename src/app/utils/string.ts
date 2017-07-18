export const ensureCorrectProtocol = (url: string) => {
	if(url){
		url = url.replace('http:', 'https:');
	}
	return url;
}