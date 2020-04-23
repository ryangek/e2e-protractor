
describe('Facebook Login Page 2', function () {
    it('should have title', function () {
        browser.get('https://facebook.com');
        const text = element(by.xpath('//*[@id="content"]/div/div/div/div/div[1]/div/div')).getText();
        expect(text).toEqual('Facebook ช่วยคุณเชื่อมต่อและแชร์กับผู้คนมากมายรอบตัวคุณ');
    });
});

describe('Facebook Login Page', function () {
    it('should have title', function () {
        browser.get('https://facebook.com');
        const text = element(by.xpath('//*[@id="content"]/div/div/div/div/div[1]/div/div')).getText();
        expect(text).toEqual('Facebook ช่วยคุณเชื่อมต่อและแชร์กับผู้คนมากมายรอบตัวคุณ');
    });
});
