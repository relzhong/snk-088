#ifndef __XZ_F10_API_4SIM__
#define __XZ_F10_API_4SIM__

extern "C"
{
	//�򿪴���
	int  WINAPI	SUNSON_OpenCom(int nPort, long nBaud);
	//�رմ���
	int WINAPI	SUNSON_CloseCom(void);
	//��ȡ���µİ�����ֵ
	int WINAPI  SUNSON_ScanKeyPress(unsigned char *ucKeyValue);
	//ʹ�ü��̷���
	int WINAPI SUNSON_UseEppPlainTextMode(unsigned char ucTextModeFormat,unsigned char *ReturnInfo);
	//���̸�λ�Լ죬������Կ��λ
	int WINAPI SUNSON_ResetEPP(bool bInitKey = FALSE);
	//��������Կ
	int WINAPI SUNSON_LoadMasterKey (unsigned char ucMKeyId,unsigned char ucMKeyLen,unsigned char *NewMasterKey,unsigned char * ReturnInfo);
	//���ع�����Կ
	int WINAPI SUNSON_LoadWorkKey(unsigned char ucMKeyId,unsigned char ucWKeyId,unsigned char ucWKeyLen,unsigned char* WorkKeyCiphertext,unsigned char *ReturnInfo);
	//�������Կ
	int WINAPI SUNSON_ActiveKey(unsigned char MasterKeyId,unsigned char ucWkeyId,unsigned char *ReturnInfo);
	//����������̼���
	int WINAPI SUNSON_StartEpp(unsigned char ucPinLen,unsigned char AlgorithmMode,unsigned char timeout,unsigned char *ReturnInfo);
	//ȡPIN����
	int WINAPI SUNSON_ReadCypherPin(unsigned char *ReturnInfo);
	//�����˺�
	int WINAPI SUNSON_LoadCardNumber(unsigned char* ucCardNumber,unsigned char *ReturnInfo);
	//�����ն˺�
	int WINAPI SUNSON_LoadTerminalNumber(unsigned char* ucTerminalNo,unsigned char *ReturnInfo);
	//���ݼ�������
	int WINAPI SUNSON_DataEncrypt(unsigned  char ucDataLen,unsigned char* SourceData,unsigned char *ReturnInfo);
	//���ݽ�������
	int WINAPI SUNSON_DataDecrypt(unsigned  char ucDataLen,unsigned char* SourceData,unsigned char *ReturnInfo);
	//����mac����
	int WINAPI SUNSON_MakeMac(int nMacDataLen,unsigned char* ucMacData,unsigned char *ReturnInfo);
	//�����ַ�
	int WINAPI SUNSON_SendAscII(unsigned char Ascii,unsigned char *ReturnInfo);
	//����IC������������
	int WINAPI SUNSON_SetSimCardIdAndKind(unsigned char CardId,unsigned char CardKind,unsigned char *ReturnInfo);
	//��ȡIC������������
	int WINAPI SUNSON_GetSimCardIdAndKind(unsigned char CardId,unsigned char *ReturnInfo);
	//�ϵ縴λIC��
	int WINAPI SUNSON_CardPowerOn(unsigned char *ReturnInfo);
	//IC���µ�
	int WINAPI SUNSON_CardPowerOff(unsigned char *ReturnInfo);
	//����COS
	int WINAPI SUNSON_UseAPDU(unsigned  char len,unsigned char* apdu,unsigned char *ReturnInfo);
	//ȡPIN����(����sam����)
	int WINAPI SUNSON_GetPinFromSIM(unsigned  char len,unsigned char* apdu,unsigned char *ReturnInfo);
	//д��Ʒ�汾��
	int WINAPI SUNSON_SetVersion(unsigned char*version,unsigned char*SerialNo,unsigned char *ReturnInfo);
	//��ȡ�汾��
	int WINAPI SUNSON_GetVersion(unsigned char *version);
	//����Ʒ�ն˺�
	int WINAPI SUNSON_GetSerialNumber(unsigned char *SerialNumber);
	//д��Ʒ�ն˺�
	int WINAPI SUNSON_SetSerialNumber(unsigned char *SerialNumber,unsigned char *ReturnInfo);
	//ubc mac ����
	int WINAPI SUNSON_MakeUBCMac(int nMacDataLen,unsigned char* ucMacData,unsigned char *ReturnInfo,unsigned char *hexReturnInfo);
	//X9.19��ECB mac
	int WINAPI SUNSON_MakeX919ECBMac(int nMacDataLen,unsigned char* ucMacData,unsigned char *hexReturnInfo);
	//X9.9��ECB mac
	int WINAPI SUNSON_MakeX99ECBMac(int nMacDataLen,unsigned char* ucMacData,unsigned char *hexReturnInfo);
	//��׼�� mac
	int WINAPI SUNSON_MakeBaseMac(int nMacDataLen,unsigned char* ucMacData,unsigned char *hexReturnInfo);
	////X9.9��CBC mac
	int WINAPI SUNSON_MakeX99CBCMac(int nMacDataLen,unsigned char* initvector,unsigned char* ucMacData,unsigned char *hexReturnInfo);
	///�����㷨�������
	int WINAPI SUNSON_SetAlgorithmParameter(unsigned char ucPPara,unsigned char ucFPara,unsigned char *ReturnInfo);	
	//����SAM�����ع�����Կ
	int WINAPI SUNSON_LoadWorkKeyBySAM(unsigned char APDULen,unsigned char MKeyID,unsigned char WKeyID, unsigned char * APDU,unsigned char *errorinfo);
	
	//��ȡ�����  ����Ҫ������  2014-4-16    xiaweiqian
	int WINAPI SUNSON_GetRandom(unsigned char *pReturnInfo);
	//����������Կ
	int WINAPI SUNSON_GenerateProcessKey(unsigned char *pRandom, int nRandomLen,unsigned char *pReturnInfo);
	//����������ѶҪ���װ�ӿ� 2014-5-6 xiaweiqian
	//��������Կ
	int WINAPI SUNSON_DownloadMasterKey(int nKeyId,int nDecKeyId,unsigned char ucKeyMode,unsigned char *ucKeyValue,unsigned char *ucCheckValue);
	//���ع�����Կ
	int WINAPI SUNSON_DownloadWorkKey(int nMKeyId,int nWKeyId,unsigned char ucKeyMode,unsigned char *ucKeyValue,unsigned char *ucCheckValue);
	//GetPin
	int WINAPI SUNSON_GetPin(int nMKeyId,int nWKeyId,unsigned char ucKeyMode,unsigned char ucPinlen,unsigned char ucPinType,unsigned char *ucCardNo,int nTimeOut,unsigned char *ucDisperse);
	//Mac
	int WINAPI SUNSON_GetMac(int nMKeyId,int nWKeyId,unsigned char ucKeyMode,unsigned char ucMacType,int nMaclen,unsigned char *ucMacData,unsigned char *ucDisperse,unsigned char *ucMacResult);
	//��������
	int WINAPI SUNSON_DataCompute(int nMKeyId,int nWKeyId,unsigned char ucKeyMode,unsigned char ucType,int nDatalen,unsigned char *ucData,unsigned char *ucDisperse,unsigned char *ucDataResult);

	//�����㷨
	//���ù��ܷ���ģʽ
	int WINAPI SUNSON_SetEPPSMMode(unsigned char ucSMMode);
	//��ȡ����ģʽ
	int WINAPI SUNSON_GetEPPSMMode(unsigned char *ucEPPMode);
	//����SM2��Կ
	int WINAPI SUNSON_GenerateSM2Key(unsigned char ucKeyId,unsigned char ucKeyAttr);
	//SM2����
	int WINAPI SUNSON_SM2DataEncrypt(unsigned char ucKeyId,WORD nDatalen,unsigned char * ucData,unsigned char *ucReturnInfo);
	//SM2����
	int WINAPI SUNSON_SM2DataDecrypt(unsigned char ucKeyId,WORD nDatalen,unsigned char * ucData,unsigned char *ucReturnInfo);
	//SM2ǩ��
	int WINAPI SUNSON_GetSM2Signature(unsigned char ucKeyId,WORD nDatalen,unsigned char * ucData,unsigned char *ucReturnInfo);
	//SM2��ǩ
	int WINAPI SUNSON_VerifySM2Signature(unsigned char ucKeyId,WORD nDatalen,unsigned char * ucData);
	//����SM2��Կ
	int WINAPI SUNSON_LoadSM2Key(unsigned char ucKeyId,WORD KeyAttr,WORD PubKeylen,unsigned char *PubKey,WORD PriKeylen,unsigned char *PriKey);
	//����SM2��Կ
	int WINAPI SUNSON_ExportSM2PublicKey(unsigned char ucKeyId,unsigned char *ucPublicKey);
	//SM3Hash����
	int WINAPI SUNSON_SM3HashOperate(unsigned char ucHashType,WORD nDatalen,unsigned char *ucData,unsigned char *ucReturnInfo);
	//Hash�û�ID
	int WINAPI SUNSON_InitHashID(unsigned char ucKeyId,WORD ucIDlen,unsigned char *ucData);
};

#endif



