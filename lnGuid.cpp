#include <node.h>
#include <v8.h>
#ifdef WIN32
#include <objbase.h>
#else
#include <uuid/uuid.h>
#endif
using namespace v8;

Handle<Value> NewGuid(const Arguments& args)
{
    HandleScope scope;
    static char buf[64] = {0};
    #ifdef WIN32
        GUID tguid;
        CoCreateGuid(&tguid);
        _snprintf_s(
            buf, sizeof(buf), "{%08X-%04X-%04x-%02X%02X-%02X%02X%02X%02X%02X%02X}",
            tguid.Data1,
            tguid.Data2,
            tguid.Data3,
            tguid.Data4[0], tguid.Data4[1],
            tguid.Data4[2], tguid.Data4[3], tguid.Data4[4],tguid.Data4[5],
            tguid.Data4[6], tguid.Data4[7]);
    #else
        uuid_t tguid;
        uuid_generate((tguid));

        snprintf(
            buf, sizeof(buf), "{%02X%02X%02X%02X-%02X%02X-%02X%02X-%02X%02X-%02X%02X%02X%02X%02X%02X}",
            tguid[0], tguid[1], tguid[2], tguid[3],
            tguid[4], tguid[5],
            tguid[6], tguid[7],
            tguid[8], tguid[9],
            tguid[10], tguid[11], tguid[12], tguid[13], tguid[14], tguid[15]);
    #endif
        
    return scope.Close(String::New(buf));
}

void init(Handle<Object> exports) {
    exports->Set(String::NewSymbol("NewGuid"), FunctionTemplate::New(NewGuid)->GetFunction());
}
NODE_MODULE(lnGuid, init);