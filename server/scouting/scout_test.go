package scouting

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestScout(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/valid-url" {
			w.WriteHeader(http.StatusNotFound)
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`Expected Return Value`))
	}))

	validUrl := server.URL + "/valid-url"

	type args struct {
		location  string
		objective string
	}
	tests := []struct {
		name    string
		args    args
		want    bool
		wantErr bool
	}{
		{"Test Found Objective", args{validUrl, "Expected Return Value"}, true, false},
		{"Test Not Find Objective", args{validUrl, "Not Expected Value"}, false, false},
		{"Test Invalid Url", args{server.URL + "/invalidUrl", "Not Expected Value"}, false, true},
		{"Test Empty Location", args{"", "Expected Return Value"}, false, true},
		{"Test Empty Objective", args{validUrl, ""}, false, true},
	}

	defer server.Close()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Scout(tt.args.location, tt.args.objective)
			if (err != nil) != tt.wantErr {
				t.Errorf("Scout() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("Scout() = %v, want %v", got, tt.want)
			}
		})
	}
}
