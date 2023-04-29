const backendDomain = "http://185.252.146.227:2323";

export const getUserID = async (
    fingerprint_id,
    weak_fingerprint_id,
    collected_typing_patterns,
) => {

    const baseUrl = backendDomain + '/v1/user/check';

    let queryParams = '';
    queryParams += '?fingerprint_id=' + fingerprint_id;
    queryParams += '&weak_fingerprint_id=' + weak_fingerprint_id;
    collected_typing_patterns.forEach(i =>
        queryParams += '&collected_typing_patterns' + i
    )

    const endpoint = `${baseUrl}${queryParams}`;

    try {
        const response = await fetch(endpoint, {cache: 'no-cache'});
        if (response.ok) {
            return await response.json();
        }
    }
    catch(error) {
        console.log(error);
    }
}